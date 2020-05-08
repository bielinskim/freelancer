import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Icon from "../icons/Icons";

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
        };
        this.secondStep = this.secondStep.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:8080/categories")
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        categories: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );

        document.getElementById("form-second-step").style.display = "none";
    }
    secondStep() {
        fetch("http://localhost:8080/skills/" + this.state.categoryChecked)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    skills: result,
                });
            })
            .catch((error) => {
                console.error("Error:", error);
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
    render() {
        return (
            <div>
                <Nav />
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
