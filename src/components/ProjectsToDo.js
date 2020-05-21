import React from "react";
import Nav from "./Nav";
import "./styles.css";
import { getProjectsToDo } from "./Util";
import Icon from "../icons/Icons";
class ProjectsToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
            projects: [],
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }
    componentDidMount() {
        this.getProjectsToDo();
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
            this.getProjectsToDo();
        }
    }
    async getProjectsToDo() {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getProjectsToDo(
                sessionStorage.getItem("userId")
            );
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
                    <h1>Zaakceptowane</h1>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 2 && (
                                <div className="list-project-container">
                                    <div className="project-list-details">
                                        <div className="project-list-author">
                                            <b>
                                                {project.email}
                                                {project.login}
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
                                                <div>{project.name}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="project-list-desc">
                                        <p>{project.description}</p>
                                    </div>
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
                                                {project.email}
                                                {project.login}
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
                                                <div>{project.name}</div>
                                            ))}
                                        </div>
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
export default ProjectsToDo;
