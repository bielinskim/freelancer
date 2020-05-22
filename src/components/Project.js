import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    getSkillsByCategoryId,
    getOffers,
    updateProjectByChosenOffer,
    checkIfUserAlreadyPostedOffer,
} from "./Util";
import LoginRegister from "./LoginRegister";
import Icon from "../icons/Icons";
import "./offer-checkbox.css";
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                id: this.props.location.state.data.project_id,
                category: this.props.location.state.data.category_id,
                skills: this.props.location.state.data.skills,
                title: this.props.location.state.data.title,
                desc: this.props.location.state.data.description,
                price: this.props.location.state.data.price,
                author_id: this.props.location.state.data.author_id,
                login: this.props.location.state.data.login,
                icon: this.props.location.state.data.icon,
                category_name: this.props.location.state.data.name,
            },
            status_id: this.props.location.state.data.status_id,
            isLogged: sessionStorage.getItem("isLogged"),
            loggedUserId: sessionStorage.getItem("userId"),
            isOwner: null,
            loginButton: "",
            offerAdded: 0,
            canPost: null,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.showhideLoginBox = this.showhideLoginBox.bind(this);
        this.updateProjectStatus = this.updateProjectStatus.bind(this);
        this.offerAdded = this.offerAdded.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.setState({
            loginButton: (
                <button
                    className="global-button form-button"
                    value="show"
                    onClick={this.showhideLoginBox}
                >
                    Żeby dodać oferte musisz być zalogowany
                </button>
            ),
        });
        if (this.state.loggedUserId == this.state.project.author_id) {
            this.setState({ isOwner: true });
        } else {
            this.setState({ isOwner: false });
        }
        this.checkIfUserAlreadyPostedOffer();
    }
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            loggedUserId: sessionStorage.getItem("userId"),
        });
        if ("true" != sessionStorage.getItem("isLogged")) {
            this.logout();
        }
        if (sessionStorage.getItem("userId") == this.state.project.author_id) {
            this.setState({ isOwner: true });
        } else {
            this.setState({ isOwner: false });
        }
    }
    async checkIfUserAlreadyPostedOffer() {
        const result = await checkIfUserAlreadyPostedOffer(
            this.state.loggedUserId,
            this.state.project.id
        );
        this.setState({ canPost: result });
    }
    updateProjectStatus() {
        this.setState({ status_id: 2 });
    }
    offerAdded() {
        this.setState({
            offerAdded: this.state.offerAdded + 1,
            canPost: false,
        });
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
                    <button
                        className="global-button form-button"
                        value="show"
                        onClick={this.showhideLoginBox}
                    >
                        Żeby dodać oferte musisz być zalogowany
                    </button>
                ),
            });
        }
    }
    logout() {
        this.setState({
            loginButton: (
                <button
                    className="global-button form-button"
                    value="show"
                    onClick={this.showhideLoginBox}
                >
                    Żeby dodać oferte musisz być zalogowany
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
        } else if (!this.state.canPost && "true" == this.state.isLogged) {
            addOffer = (
                <p>
                    <b>Dodałeś już ofertę</b>
                </p>
            );
        } else if ("true" == this.state.isLogged && !this.state.isOwner) {
            addOffer = (
                <AddOffer
                    offerAdded={this.offerAdded}
                    project={this.state.project}
                />
            );
        } else if ("true" == this.state.isLogged && this.state.isOwner) {
            addOffer = <p>Nie mozesz dodac oferty do wlasnego projektu</p>;
        } else {
            addOffer = this.state.loginButton;
        }
        return (
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <ProjectView project={this.state.project} />
                    <OffersList
                        projectId={this.state.project.id}
                        statusId={this.state.status_id}
                        isOwner={this.state.isOwner}
                        loggedUserId={this.state.loggedUserId}
                        changeStatus={this.updateProjectStatus}
                        offerAdded={this.state.offerAdded}
                    />
                    {addOffer}
                </div>
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
        return (
            <div>
                <div className="project-list-details">
                    <div className="project-list-author">
                        <b>{this.state.project.login}</b>
                    </div>
                    <div className="project-list-price">
                        {this.state.project.price} PLN
                    </div>
                    <div className="project-list-category">
                        <Icon icon={this.state.project.icon} />
                        <b>
                            <div>{this.state.project.category_name}</div>
                        </b>
                    </div>
                    <div className="project-list-skills">
                        {this.state.project.skills.map((skill) => (
                            <div>{skill.name}</div>
                        ))}
                    </div>
                </div>
                <div className="project-title">
                    <b>{this.state.project.title}</b>
                </div>
                <div className="project-list-desc">
                    <p>{this.state.project.desc}</p>
                </div>
            </div>
        );
    }
}
class OffersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: props.projectId,
            status_id: props.statusId,
            offers: [],
            isOwner: null,
            offerAdded: 0,
        };
        this.chooseOffer = this.chooseOffer.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isOwner != prevState.isOwner) {
            return { isOwner: nextProps.isOwner };
        }
        if (nextProps.offerAdded != prevState.offerAdded) {
            return { offerAdded: nextProps.offerAdded };
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
            <div className="project-offers-container">
                {this.state.offers.map((item) => (
                    <div className="project-offer-container" key={item.id}>
                        <div className="project-offer-author-date">
                            <b className="project-offer-author">
                                {item.user[0].login}
                            </b>
                            <span
                                style={{
                                    width: "20px",
                                    display: "inline-block",
                                }}
                            ></span>
                            {item.created_at}
                        </div>
                        <div className="project-offer-time-price">
                            Przewidywany czas pracy:<span> </span>
                            <b>{item.estimated_time}</b> dni
                            <span
                                style={{
                                    width: "40px",
                                    display: "inline-block",
                                }}
                            ></span>
                            Proponowana cena: <b>{item.price}</b> PLN
                        </div>
                        <div className="project-offer-skills">
                            Umiejętności:
                            <span
                                style={{
                                    width: "20px",
                                    display: "inline-block",
                                }}
                            ></span>
                            {item.skills.map((skill) => (
                                <div>{skill.name}</div>
                            ))}
                        </div>
                        <div className="project-offer-message">
                            {item.message}
                        </div>
                        {this.state.isOwner && this.state.status_id == 1 ? (
                            <button
                                className="global-button"
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
        fetch("http://localhost:8080/postoffer", requestOptions).then(
            function () {
                var checkboxes = document.getElementsByClassName(
                    "offer-skills-checkbox"
                );
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes.item(i).checked = false;
                }
                this.setState({
                    skillsChecked: [],
                    message: "",
                    price: 0,
                    estimated_time: 0,
                });

                this.props.offerAdded();
            }.bind(this)
        );
    }
    render() {
        return (
            <div class="add-offer-container">
                <form onSubmit={this.handleSubmit}>
                    <div id="skills" class="offer-skills">
                        Posiadane umiejętności:
                        <br /> <br />
                        {this.state.skillsToSelect.map((item) => (
                            <label class="ocontainer">
                                {item.name}
                                <input
                                    key={item.skill_id}
                                    onClick={this.selectSkill}
                                    type="checkbox"
                                    value={item.skill_id}
                                    className="offer-skills-checkbox"
                                />
                                <span class="ocheckmark"></span>
                            </label>
                        ))}
                    </div>
                    <div className="offer-rest">
                        <div id="offer-message-container">
                            <label>Treść:</label>
                            <br />
                            <textarea
                                rows="4"
                                cols="50"
                                id="offer-message"
                                name="message"
                                onChange={this.changeState}
                                value={this.state.message}
                            />
                        </div>
                        <div id="offer-time-container">
                            <label>Szacowany czas(w dniach):</label>
                            <br />
                            <input
                                id="offer-time"
                                type="number"
                                name="time"
                                onChange={this.changeState}
                                value={this.state.estimated_time}
                            />
                        </div>
                        <div id="offer-price-container">
                            <label>Proponowana cena</label>
                            <br />
                            <input
                                id="offer-price"
                                type="number"
                                name="price"
                                onChange={this.changeState}
                                value={this.state.price}
                            />
                        </div>
                        <br /> <br />
                    </div>
                    <button
                        className="global-button offer-send-button"
                        type="submit"
                    >
                        Wyślij
                    </button>
                    <br />
                </form>
            </div>
        );
    }
}
