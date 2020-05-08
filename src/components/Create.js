import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Icon from "../icons/Icons";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            skills: [],
            categoryChecked: "",
            skillsChecked: [],
            desc: "",
            price: 0,
            error: null,
            isLoaded: false,
            posted: false,
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.secondStep = this.secondStep.bind(this);
        this.thirdStep = this.thirdStep.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
        this.descChange = this.descChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.postProject = this.postProject.bind(this);
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
        document.getElementById("form-third-step").style.display = "none";
    }
    secondStep() {
        fetch("http://localhost:8080/skills/" + this.state.categoryChecked)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        skills: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
        document.getElementById("form-first-step").style.display = "none";
        document.getElementById("form-second-step").style.display = "block";
    }
    thirdStep() {
        document.getElementById("form-second-step").style.display = "none";
        document.getElementById("form-third-step").style.display = "block";
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
            desc: this.state.desc,
            price: this.state.price,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/post", requestOptions).then(() =>
            alert("Wysłano")
        );
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
                            <div key={item.skill_id}>
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
                        <button
                            id="third-step-button"
                            type="button"
                            onClick={this.thirdStep}
                        >
                            Dalej
                        </button>
                    </div>
                    <div id="form-third-step">
                        <div id="desc">
                            <h2>Opis</h2>
                            <textarea
                                value={this.state.value}
                                name="desc"
                                onChange={this.descChange}
                            />
                        </div>
                        <div id="price">
                            <h2>Cena</h2>
                            <input
                                type="number"
                                name="price"
                                onChange={this.priceChange}
                            />
                        </div>
                        <Link to="/">
                            <button onClick={this.postProject}>Wyślij</button>
                        </Link>
                        <br />
                    </div>
                </form>
            </div>
        );
    }
}

/* <Link
    to={{
        pathname: "/create",
        state: {
            message: "hello, im a passed message!",
        },
    }}
>
    Test
</Link>; */

// componentDidMount() {
//     var recievedMessage = this.props.location.state.message;
//     alert(recievedMessage);
// }
// function firstStep() {

// }
// function SubmitButton(props) {
//     if (props.stat.type === "search") {
//         return (
//             <Link to="/">
//                 <button>Dalej</button>
//             </Link>
//         );
//     } else if (props.stat.type === "create")
//         return (
//             <Link to="/create">
//                 <button>Dalej</button>
//             </Link>
//         );
//     else {
//         return (
//             <Link to="/">
//                 <button>Dalej</button>
//             </Link>
//         );
//     }
// }

export default Create;
