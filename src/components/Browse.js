import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Icon from "../icons/Icons";
import { getSkillsByCategoryId, getCategories } from "./Util";
import "./styles.css";
import "./checkbox.css";
import "../icons/icons.css";
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
            previousTarget: null,
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
        if (this.state.previousTarget != null) {
            this.state.previousTarget.classList.remove(
                "category-container-active"
            );
        }
        e.currentTarget.classList.add("category-container-active");
        this.setState({ previousTarget: e.currentTarget });
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
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <form>
                        <div id="form-first-step">
                            <h1>Wybierz kategorie:</h1>
                            {this.state.categories.map((item) => (
                                <label
                                    className="category-container"
                                    key={item.category_id}
                                >
                                    <div
                                        className="category-icon"
                                        key={item.category_id}
                                        category_id={item.category_id}
                                        onClick={this.selectCategory}
                                    >
                                        <Icon icon={item.icon} />
                                    </div>
                                    <p>{item.name}</p>
                                </label>
                            ))}
                            <br />
                            <button
                                id="second-step-button"
                                className="global-button form-button"
                                type="button"
                                onClick={this.secondStep}
                            >
                                Dalej
                            </button>
                        </div>
                        <div id="form-second-step">
                            <h1>Wybierz umiejętności:</h1>
                            {this.state.skills.map((item) => (
                                <label class="container">
                                    {item.name}
                                    <input
                                        key={item.skill_id}
                                        onClick={this.selectSkill}
                                        type="checkbox"
                                        value={item.skill_id}
                                    />
                                    <span class="checkmark"></span>
                                </label>
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
                                <button className="global-button form-button">
                                    Szukaj
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Browse;
