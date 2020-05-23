import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Icon from "../icons/Icons";
import LoginRegister from "./LoginRegister";
import { getSkillsByCategoryId, getCategories } from "./Util";
import "./styles.css";
import "./checkbox.css";
import "../icons/icons.css";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            skills: [],
            categoryChecked: "",
            skillsChecked: [],
            title: "",
            desc: "",
            price: 0,
            error: null,
            isLoaded: false,
            posted: false,
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
            loginButton: "",
            previousTarget: null,
        };
        this.secondStep = this.secondStep.bind(this);
        this.thirdStep = this.thirdStep.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.postProject = this.postProject.bind(this);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.showhideLoginBox = this.showhideLoginBox.bind(this);
        this.logout = this.logout.bind(this);
    }
    async componentDidMount() {
        const result = await getCategories();
        this.setState({
            categories: result,
        });
        this.setState({
            loginButton: (
                <button
                    value="show"
                    className="global-button form-button"
                    onClick={this.showhideLoginBox}
                >
                    Żeby dodać projekt musisz byc zalogowany
                </button>
            ),
        });
    }
    async secondStep() {
        const res = await getSkillsByCategoryId(this.state.categoryChecked);
        this.setState({
            skills: res,
        });
        document.getElementById("form-first-step").style.display = "none";
        document.getElementById("form-second-step").style.display = "block";
    }
    thirdStep() {
        document.getElementById("form-second-step").style.display = "none";
        document.getElementById("form-third-step").style.display = "block";
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
    titleChange(e) {
        this.setState({
            title: e.target.value,
        });
    }
    descChange(e) {
        this.setState({
            desc: e.target.value,
        });
    }
    priceChange(e) {
        this.setState({
            price: e.target.value,
        });
    }
    handleSubmit(event) {
        //event.preventDefault();
        alert(this.state.skillsChecked);
    }
    postProject() {
        var body = {
            category: this.state.categoryChecked,
            skills: this.state.skillsChecked,
            title: this.state.title,
            desc: this.state.desc,
            price: this.state.price,
            user_id: this.state.userId,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch(window.config.host + "createproject", requestOptions).then(() =>
            alert("Wysłano")
        );
    }
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
        if ("true" != sessionStorage.getItem("isLogged")) {
            this.logout();
        }
    }
    showhideLoginBox(e) {
        //e.preventDefault();
        if (e.target.value == "show") {
            this.setState({
                loginButton: (
                    <LoginRegister
                        changeStatus={this.changeLoginStatus}
                        showhideLoginBox={this.showhideLoginBox}
                    />
                ),
            });
        } else if (e.target.value == "hide") {
            this.setState({
                loginButton: (
                    <button
                        value="show"
                        className="global-button form-button"
                        onClick={this.showhideLoginBox}
                    >
                        Żeby dodać projekt musisz byc zalogowany
                    </button>
                ),
            });
        }
    }
    logout() {
        this.setState({
            isLogged: false,
            loginButton: (
                <button
                    value="show"
                    className="global-button form-button"
                    onClick={this.showhideLoginBox}
                >
                    Żeby dodać projekt musisz byc zalogowany
                </button>
            ),
        });
    }
    render() {
        if ("true" != sessionStorage.getItem("isLogged")) {
            return (
                <div className="global-background">
                    <div className="global-content">
                        <Nav
                            isLogged={this.state.isLogged}
                            changeStatus={this.changeLoginStatus}
                        />
                        {this.state.loginButton}
                    </div>
                </div>
            );
        } else {
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
                            <div
                                id="form-second-step"
                                style={{ display: "none" }}
                            >
                                <h1>Wybierz wymagane umiejętności:</h1>
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
                                <button
                                    id="third-step-button"
                                    className="global-button form-button"
                                    type="button"
                                    onClick={this.thirdStep}
                                >
                                    Dalej
                                </button>
                            </div>
                            <div
                                id="form-third-step"
                                style={{ display: "none" }}
                            >
                                <div id="title">
                                    <h2>Tytuł</h2>
                                    <input
                                        name="title"
                                        minlength="5"
                                        onChange={this.titleChange}
                                    />
                                </div>
                                <div id="desc">
                                    <h2>Opis</h2>
                                    <textarea
                                        value={this.state.value}
                                        name="desc"
                                        onChange={this.descChange}
                                        rows="20"
                                        cols="50"
                                    />
                                </div>
                                <div id="price">
                                    <h2>Cena</h2>
                                    <input
                                        type="number"
                                        name="price"
                                        onChange={this.priceChange}
                                    />
                                    PLN
                                </div>
                                <Link to="/">
                                    <button
                                        className="global-button form-button"
                                        onClick={this.postProject}
                                    >
                                        Wyślij
                                    </button>
                                </Link>
                                <br />
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default Create;
