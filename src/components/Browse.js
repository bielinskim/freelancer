import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Icon from "../icons/Icons";
import { getSkillsByCategoryId, getCategories } from "./Util";

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            skills: [],
            categoryChecked: "",
            skillsChecked: [],
            error: null,
            isLoaded: false,
            isLogged: null,
        };
        this.secondStep = this.secondStep.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }
    async componentDidMount() {
        const result = await getCategories();
        this.setState({
            categories: result,
        });
        document.getElementById("form-second-step").style.display = "none";
    }
    async secondStep() {
        const res = await getSkillsByCategoryId(this.state.categoryChecked);
        this.setState({
            skills: res,
        });
        document.getElementById("form-first-step").style.display = "none";
        document.getElementById("form-second-step").style.display = "block";
    }
    selectCategory(e) {
        this.setState({
            categoryChecked: e.currentTarget.getAttribute("category_id"),
        });
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
    handleSubmit(event) {
        //event.preventDefault();
        alert(this.state.skillsChecked);
    }
    changeLoginStatus() {
        this.setState({ isLogged: sessionStorage.getItem("isLogged") });
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <form>
                    <div id="form-first-step">
                        <h2>Kategorie</h2>
                        {this.state.categories.map((item) => (
                            <label key={item.category_id}>
                                <div
                                    key={item.category_id}
                                    category_id={item.category_id}
                                    onClick={this.selectCategory}
                                >
                                    <Icon icon={item.icon} />
                                </div>
                                {item.name}
                            </label>
                        ))}
                        <br />
                        <button
                            id="second-step-button"
                            type="button"
                            onClick={this.secondStep}
                        >
                            Dalej
                        </button>
                    </div>
                    <div id="form-second-step">
                        <h2>Umiejetnosci</h2>
                        {this.state.skills.map((item) => (
                            <div>
                                <input
                                    key={item.skill_id}
                                    onClick={this.selectSkill}
                                    type="checkbox"
                                    value={item.skill_id}
                                />
                                {item.name}
                            </div>
                        ))}
                        <br />
                        <Link
                            to={{
                                pathname: "/list",
                                state: {
                                    category: this.state.categoryChecked,
                                    skills: this.state.skillsChecked,
                                },
                            }}
                        >
                            Szukaj
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Browse;
