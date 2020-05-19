import React from "react";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getSkillsByCategoryId } from "./Util";

import "./styles.css";

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            project: this.props.location.state.project,
            skillsToSelect: [],
            skillsChecked: [],
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.skillsToSelect();
    }
    componentDidUpdate() {}
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
    }
    async skillsToSelect() {
        const res = await getSkillsByCategoryId(this.state.project.category_id);

        this.setState({
            skillsToSelect: res,
        });
        this.prepareCheckboxes();
    }
    prepareCheckboxes() {
        var skills_id = [];
        var checkboxes = document.getElementsByClassName(
            "edit-skills-checkbox"
        );
        for (var i = 0; i < checkboxes.length; i++) {
            if ((checkboxes.item(i).name = this.state.project.skills[i])) {
                skills_id.push(this.state.project.skills[i].skill_id);
                checkboxes.item(i).checked = true;
            }
        }
        this.setState({ skillsChecked: skills_id });
    }
    clearCheckboxes() {
        var skills_id = [];
        var checkboxes = document.getElementsByClassName(
            "edit-skills-checkbox"
        );
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes.item(i).checked = false;
        }
        this.setState({ skillsChecked: [] });
    }
    selectSkill(e) {
        if (e.target.checked) {
            this.setState({
                skillsChecked: [...this.state.skillsChecked, e.target.value],
            });
        } else {
            let remove = this.state.skillsChecked.indexOf(e.target.value);
            this.setState({
                skillsChecked: this.state.skillsChecked.filter(
                    (_, i) => i !== remove
                ),
            });
        }
    }
    async onChangeCategory(categoryId) {
        const res = await getSkillsByCategoryId(categoryId);
        this.setState({
            skillsToSelect: res,
        });
        this.clearCheckboxes();
    }
    handleChange(e) {
        var project = this.state.project;
        switch (e.target.id) {
            case "edit-category":
                project.category_id = e.target.value;
                this.onChangeCategory(e.target.value);
                break;
            case "edit-desc":
                project.description = e.target.value;
                break;
            case "edit-price":
                project.price = e.target.value;
                break;
            case "edit-status":
                project.status_id = e.target.value;
                break;
        }
        this.setState({ project: project });
    }
    handleSubmit(event) {
        event.preventDefault();
        var body = {
            project_id: this.state.project.project_id,
            category_id: this.state.project.category_id,
            skills: this.state.skillsChecked,
            description: this.state.project.description,
            price: this.state.project.price,
            status_id: this.state.project.status_id,
        };
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/editproject", requestOptions).then(() =>
            alert("Zedytowano")
        );
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <Link to="/projectsmanager">Powrót</Link>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="edit-category"
                        type="number"
                        value={this.state.project.category_id}
                        onChange={this.handleChange}
                    ></input>
                    <br />
                    {this.state.skillsToSelect.map((item) => (
                        <div key={item.skill_id}>
                            <input
                                key={item.skill_id}
                                onClick={this.selectSkill}
                                type="checkbox"
                                value={item.skill_id}
                                name={item.name}
                                className="edit-skills-checkbox"
                            />
                            {item.name}
                        </div>
                    ))}
                    <textarea
                        id="edit-desc"
                        rows="25"
                        cols="50"
                        value={this.state.project.description}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        id="edit-price"
                        type="number"
                        value={this.state.project.price}
                        onChange={this.handleChange}
                    ></input>
                    <br />
                    <input
                        id="edit-status"
                        type="number"
                        value={this.state.project.status_id}
                    ></input>
                    <br />
                    <button type="submit">Wyślij</button>
                    <br />
                </form>
            </div>
        );
    }
}
export default EditProject;
