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
        var checkboxes = document.getElementsByClassName(
            "edit-skills-checkbox"
        );
        for (var i = 0; i < checkboxes.length; i++) {
            if ((checkboxes.item(i).name = this.state.project.skills[i])) {
                checkboxes.item(i).checked = true;
            }
        }
        this.setState({ skillsChecked: this.state.project.skills });
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
    handleChange(e) {
        var project = this.state.project;
        switch (e.target.id) {
            case "edit-category":
                project.category_id = e.target.value;
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
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <Link to="/employee">Powrót</Link>
                <br />
                <input
                    id="edit-category"
                    type="number"
                    value={this.state.project.category_id}
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
            </div>
        );
    }
}
export default EditProject;
