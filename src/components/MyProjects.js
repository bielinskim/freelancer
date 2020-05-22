import React from "react";
import Nav from "./Nav";
import { getMyProjects, setStatusToDone } from "./Util";
import Icon from "../icons/Icons";
import "./styles.css";

class MyProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            projects: [],
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.setStatusToDone = this.setStatusToDone.bind(this);
    }
    componentDidMount() {
        this.getMyProjects();
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
            this.getMyProjects();
        }
    }
    async getMyProjects() {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getMyProjects(sessionStorage.getItem("userId"));
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                projects: result,
            });
        }
    }
    async setStatusToDone(e) {
        const isUpdated = await setStatusToDone(e.target.value);
        this.setState({
            update: this.state.update + 1,
        });
        this.getMyProjects();
    }
    render() {
        return (
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <h1>Utworzone</h1>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 1 && (
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
                                </div>
                            )
                    )}

                    <h1>Rozpoczęte</h1>

                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 2 && (
                                <div className="list-project-container">
                                    <div className="project-list-details">
                                        <div className="project-list-author">
                                            <b>
                                                Wykonawca:{" "}
                                                {project.contractor.length !=
                                                    0 &&
                                                    project.contractor[0]
                                                        .login +
                                                        " - " +
                                                        project.contractor[0]
                                                            .email}
                                            </b>
                                        </div>
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
                                        className="global-button form-button"
                                        value={project.project_id}
                                        onClick={this.setStatusToDone}
                                    >
                                        Zakończ
                                    </button>
                                </div>
                            )
                    )}

                    <h1>Zakończone</h1>

                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 3 && (
                                <div className="list-project-container">
                                    <div className="project-list-details">
                                        <div className="project-list-author">
                                            <b>
                                                Wykonawca:{" "}
                                                {project.contractor.length !=
                                                    0 &&
                                                    project.contractor[0]
                                                        .login +
                                                        " - " +
                                                        project.contractor[0]
                                                            .email}
                                            </b>
                                        </div>
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
                                </div>
                            )
                    )}
                </div>
            </div>
        );
    }
}
export default MyProjects;
