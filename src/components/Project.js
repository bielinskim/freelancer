import React from "react";
import Nav from "./Nav";
import offersdata from "./offersdata.json";
import "./test.css";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getSkillsByCategoryId, getOffers } from "./Util";
import LoginRegister from "./LoginRegister";
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                id: this.props.location.state.data.project_id,
                category: this.props.location.state.data.category_id,
                skills: this.props.location.state.data.skills,
                desc: this.props.location.state.data.description,
                price: this.props.location.state.data.price,
            },
            offers: offersdata,
            isLogged: sessionStorage.getItem("isLogged"),
            loginButton: "",
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.showhideLoginBox = this.showhideLoginBox.bind(this);
    }
    componentDidMount() {
        this.setState({
            loginButton: (
                <button value="show" onClick={this.showhideLoginBox}>
                    Zeby dodac oferte musisz byc zalogowany
                </button>
            ),
        });
    }
    changeLoginStatus() {
        this.setState({ isLogged: sessionStorage.getItem("isLogged") });
    }
    showhideLoginBox(e) {
        e.preventDefault();
        if (e.target.value == "show") {
            this.setState({
                loginButton: (
                    <LoginRegister changeStatus={this.changeLoginStatus} />
                ),
            });
        }
        // TODO: obsluga 'anuluj'
        // else if(e.target.value == "hide")
    }
    render() {
        let addOffer;
        if (
            this.state.isLogged &&
            sessionStorage.getItem("userId") != this.state.project.id
        ) {
            addOffer = <AddOffer project={this.state.project} />;
        } else if (sessionStorage.getItem("userId") == this.state.project.id) {
            addOffer = <p>Nie mozesz dodac oferty do wlasnego projektu</p>;
        } else {
            addOffer = this.state.loginButton;
        }
        return (
            <div>
                <Nav />
                <ProjectView project={this.state.project} />
                <OffersList projectId={this.state.project.id} />
                {addOffer}
            </div>
        );
    }
}

export default Project;

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { project: props.project };
    }
    render() {
        return <p>{this.state.project.price}</p>;
    }
}
class OffersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: props.projectId,
            offers: [],
        };
    }
    componentDidMount() {
        this.fetchOffersList();
    }
    async fetchOffersList() {
        const result = await getOffers(this.state.project_id);
        this.setState({
            offers: result,
        });
    }
    render() {
        return (
            <div>
                dasdsa
                {this.state.offers.map((item) => (
                    <div key={item.id}>
                        <p>{item.user[0].login}</p>
                        <p>{item.user[0].email}</p>
                        {item.skills.map((skill) => (
                            <p>{skill.name}</p>
                        ))}
                        <p>{item.estimated_time}</p>
                        <p>{item.created_at}</p>
                        <p>{item.message}</p>

                        <p>{item.price}</p>
                    </div>
                ))}
            </div>
        );
    }
}
class AddOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.project,
            skillsToSelect: [],
            offer: {
                skillsChecked: [],
                message: "",
                price: 0,
                estimated_time: 0,
                project_id: props.project.project_id,
                user_id: sessionStorage.getItem("userId"),
            },
        };

        this.changeState = this.changeState.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.skillsToSelect();
    }
    changeState(e) {
        switch (e.target.id) {
            case "offer-message":
                this.state.setState({ message: e.target.value });
                break;
            case "offer-time":
                this.state.setState({ estimated_time: e.target.value });
                break;
            case "offer-price":
                this.state.setState({ price: e.target.value });
                break;
        }
    }
    selectSkill(e) {
        if (e.target.checked) {
            this.state.offer.setState({
                skillsChecked: [
                    ...this.state.offer.skillsChecked,
                    e.target.value,
                ],
            });
        } else {
            let remove = this.state.offer.skillsChecked.indexOf(e.target.value);
            this.setState({
                skillsChecked: this.state.offer.skillsChecked.filter(
                    (_, i) => i !== remove
                ),
            });
        }
    }
    async skillsToSelect() {
        const res = await getSkillsByCategoryId(this.state.project.category);
        this.setState({
            skillsToSelect: res,
        });
    }
    handleSubmit() {
        var body = {
            category: this.state.project.category_id,
            skills: this.state.offer.skillsChecked,
            message: this.state.offer.message,
            estimated_time: this.state.offer.estimated_time,
            price: this.state.offer.price,
            project_id: this.state.offer.project_id,
            user_id: this.state.offer.user_id,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/postoffer", requestOptions).then(() =>
            alert("Wysłano")
        );
    }
    render() {
        return (
            <div>
                <form>
                    <div id="skills">
                        {this.state.skillsToSelect.map((item) => (
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
                    </div>
                    <div id="message">
                        <label>Treść</label>
                        <textarea
                            id="offer-message"
                            value={this.state.value}
                            name="message"
                            onChange={this.changeState}
                        />
                    </div>
                    <div id="offer-time">
                        <label>Szacowany czas(w dniach)</label>
                        <input
                            id=""
                            type="number"
                            name="time"
                            onChange={this.changeState}
                        />
                    </div>
                    <div id="offer-price">
                        <label>Proponowana cena</label>
                        <input
                            id=""
                            type="number"
                            name="price"
                            onChange={this.changeState}
                        />
                    </div>
                    <button type="submit" onSubmit={this.handleSubmit}>
                        Wyślij
                    </button>
                    <br />
                </form>
            </div>
        );
    }
}
