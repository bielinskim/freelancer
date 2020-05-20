import React from "react";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getSkillsByCategoryId } from "./Util";

import "./styles.css";

class EditOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            offer: this.props.location.state.offer,
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
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
    }
    async skillsToSelect() {
        const res = await getSkillsByCategoryId(this.state.offer.category_id);

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
            if ((checkboxes.item(i).name = this.state.offer.skills[i])) {
                skills_id.push(this.state.offer.skills[i].skill_id);
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
        var offer = this.state.offer;
        switch (e.target.id) {
            case "edit-category":
                offer.category_id = e.target.value;
                this.onChangeCategory(e.target.value);
                break;
            case "edit-message":
                offer.message = e.target.value;
                break;
            case "edit-time":
                offer.estimated_time = e.target.value;
                break;
            case "edit-price":
                offer.price = e.target.value;
                break;
        }
        this.setState({ offer: offer });
    }
    handleSubmit(event) {
        event.preventDefault();
        var body = {
            offer_id: this.state.offer.offer_id,
            category_id: this.state.offer.category_id,
            skills: this.state.skillsChecked,
            message: this.state.offer.message,
            price: this.state.offer.price,
            estimated_time: this.state.offer.estimated_time,
        };
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/editoffer", requestOptions).then(() =>
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
                <Link to="/offersmanager">Powrót</Link>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="edit-category"
                        type="number"
                        value={this.state.offer.category_id}
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
                        id="edit-message"
                        rows="25"
                        cols="50"
                        value={this.state.offer.message}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        id="edit-time"
                        type="number"
                        value={this.state.offer.estimated_time}
                        onChange={this.handleChange}
                    ></input>
                    <br />

                    <input
                        id="edit-price"
                        type="number"
                        value={this.state.offer.price}
                        onChange={this.handleChange}
                    ></input>
                    <br />
                    <button type="submit">Wyślij</button>
                    <br />
                </form>
            </div>
        );
    }
}
export default EditOffer;
