import React from "react";
import Nav from "./Nav";
import { getProjectsByDate, deleteProject } from "./Util";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Icon from "../icons/Icons";

class ProjectsManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            projects: [],
            update: 0,
            periodOfData: 9999,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.setPeriodOfData = this.setPeriodOfData.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }
    componentDidMount() {
        this.getProjectsByDate(this.state.periodOfData);
    }

    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
        if (sessionStorage.getItem("userId") == "null") {
            this.setState({
                projects: [],
            });
        } else {
            this.getProjectsByDate(this.state.periodOfData);
        }
    }
    setPeriodOfData(e) {
        this.setState({ periodOfData: e.target.value });
        this.getProjectsByDate(e.target.value);
    }
    async deleteProject(e) {
        await deleteProject(e.target.value);
        this.setState({
            update: this.state.update + 1,
        });
        this.getProjectsByDate(this.state.periodOfData);
    }
    async getProjectsByDate(period) {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getProjectsByDate(period);
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                projects: result,
            });
        }
    }
    render() {
        return (
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <button
                        className="global-button"
                        value={1}
                        onClick={this.setPeriodOfData}
                    >
                        Dzień
                    </button>
                    <button
                        className="global-button"
                        value={7}
                        onClick={this.setPeriodOfData}
                    >
                        Tydzień
                    </button>
                    <button
                        className="global-button"
                        value={31}
                        onClick={this.setPeriodOfData}
                    >
                        Miesiąc
                    </button>
                    <button
                        className="global-button"
                        value={365}
                        onClick={this.setPeriodOfData}
                    >
                        Rok
                    </button>
                    <button
                        className="global-button"
                        value={9999}
                        onClick={this.setPeriodOfData}
                    >
                        Wszystkie
                    </button>

                    {this.state.projects.map((project) => (
                        <div className="list-project-container">
                            <div className="project-list-details">
                                <div className="project-list-price">
                                    {project.price} PLN
                                </div>
                                <div className="project-list-category">
                                    <Icon icon={project.icon} />
                                    <b>
                                        <div>{project.name}</div>
                                    </b>
                                </div>
                                <div className="project-list-skills">
                                    {project.skills.map((skill) => (
                                        <div>{skill.name}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="project-title">
                                <b>{project.title}</b>
                            </div>
                            <div className="project-list-desc">
                                <p>{project.description}</p>
                            </div>
                            <button
                                className="global-button"
                                value={project.project_id}
                                onClick={this.deleteProject}
                            >
                                Usuń
                            </button>

                            <Link
                                to={{
                                    pathname: "/editproject",
                                    state: {
                                        project: project,
                                    },
                                }}
                            >
                                <button className="global-button">
                                    Edytuj
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default ProjectsManager;
