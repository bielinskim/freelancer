import React from "react";
import Nav from "./Nav";
import offersdata from "./offersdata.json";
import "./test.css";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    getSkillsByCategoryId,
    getOffers,
    updateProjectByChosenOffer,
} from "./Util";
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
                author_id: this.props.location.state.data.author_id,
            },
            status_id: this.props.location.state.data.status_id,
            offers: offersdata,
            isLogged: sessionStorage.getItem("isLogged"),
            loggedUserId: sessionStorage.getItem("userId"),
            isOwner: null,
            loginButton: "",
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.showhideLoginBox = this.showhideLoginBox.bind(this);
        this.updateProjectStatus = this.updateProjectStatus.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.setState({
            loginButton: (
                <button value="show" onClick={this.showhideLoginBox}>
                    Zeby dodac oferte musisz byc zalogowany
                </button>
            ),
        });
        if (this.state.loggedUserId == this.state.project.author_id) {
            this.setState({ isOwner: true });
        } else {
            this.setState({ isOwner: false });
        }
    }
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            loggedUserId: sessionStorage.getItem("userId"),
        });
        if (this.state.loggedUserId == this.state.project.author_id) {
            this.setState({ isOwner: true });
        } else {
            this.setState({ isOwner: false });
        }
    }
    updateProjectStatus() {
        this.setState({ status_id: 2 });
    }
    showhideLoginBox(e) {
        e.preventDefault();
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
                    <button value="show" onClick={this.showhideLoginBox}>
                        Zeby dodac oferte musisz byc zalogowany
                    </button>
                ),
            });
        }
    }
    logout() {
        this.setState({
            isLogged: false,
            loginButton: (
                <button value="show" onClick={this.showhideLoginBox}>
                    Zeby dodac oferte musisz byc zalogowany
                </button>
            ),
        });
    }
    render() {
        let addOffer;
        if (this.state.status_id == 2 || this.state.status_id == 3) {
            addOffer = (
                <p>Oferta zostala wybrana lub projekt jest zakonczony</p>
            );
        } else if ("true" != this.state.isLogged && !this.state.isOwner) {
            addOffer = <AddOffer project={this.state.project} />;
        } else if ("true" != this.state.isLogged && this.state.isOwner) {
            addOffer = <p>Nie mozesz dodac oferty do wlasnego projektu</p>;
        } else {
            addOffer = this.state.loginButton;
        }
        return (
            <div>
                <Nav isLogged={this.state.isLogged} logout={this.logout} />
                <ProjectView project={this.state.project} />
                <OffersList
                    projectId={this.state.project.id}
                    statusId={this.state.status_id}
                    isOwner={this.state.isOwner}
                    loggedUserId={this.state.loggedUserId}
                    changeStatus={this.updateProjectStatus}
                />
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
            status_id: props.statusId,
            offers: [],
            isOwner: props.isOwner,
        };
        this.chooseOffer = this.chooseOffer.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isOwner !== prevState.isOwner) {
            return { isOwner: nextProps.isOwner };
        }
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
    chooseOffer(e) {
        const isUpdated = updateProjectByChosenOffer(
            this.state.project_id,
            e.target.value
        );

        this.setState({
            status_id: 2,
        });
        this.props.changeStatus();
    }
    render() {
        return (
            <div>
                <h1>{this.state.isOwner}</h1>
                <h1>{this.state.project_id}</h1>
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
                        {this.state.isOwner && this.state.status_id == 1 ? (
                            <button
                                value={item.offer_id}
                                onClick={this.chooseOffer}
                            >
                                Wybierz
                            </button>
                        ) : (
                            ""
                        )}
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
            skillsChecked: [],
            message: "",
            price: 0,
            estimated_time: 0,
            project_id: props.project.id,
            user_id: sessionStorage.getItem("userId"),
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
                this.setState({ message: e.target.value });
                break;
            case "offer-time":
                this.setState({ estimated_time: e.target.value });
                break;
            case "offer-price":
                this.setState({ price: e.target.value });
                break;
        }
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
    async skillsToSelect() {
        const res = await getSkillsByCategoryId(this.state.project.category);
        this.setState({
            skillsToSelect: res,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var body = {
            category: this.state.project.category,
            skills: this.state.skillsChecked,
            message: this.state.message,
            estimated_time: this.state.estimated_time,
            price: this.state.price,
            project_id: this.state.project.id,
            user_id: this.state.user_id,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/postoffer", requestOptions).then(() =>
            alert("Wysłano")
        );
        this.setState({
            skillsToSelect: [],
            skillsChecked: [],
            message: "",
            price: 0,
            estimated_time: 0,
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                    <div id="offer-message-container">
                        <label>Treść</label>
                        <textarea
                            id="offer-message"
                            name="message"
                            onChange={this.changeState}
                        />
                    </div>
                    <div id="offer-time-container">
                        <label>Szacowany czas(w dniach)</label>
                        <input
                            id="offer-time"
                            type="number"
                            name="time"
                            onChange={this.changeState}
                        />
                    </div>
                    <div id="offer-price-container">
                        <label>Proponowana cena</label>
                        <input
                            id="offer-price"
                            type="number"
                            name="price"
                            onChange={this.changeState}
                        />
                    </div>
                    <button type="submit">Wyślij</button>
                    <br />
                </form>
            </div>
        );
    }
}
