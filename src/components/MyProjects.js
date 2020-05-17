import React from "react";
import Nav from "./Nav";
import { getMyProjects, setStatusToDone } from "./Util";

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
    componentDidUpdate() {
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
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <h1>Utworzone</h1>
                <ul>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 1 && (
                                <li>
                                    <p>{project.project_id}</p>
                                    <p>{project.category_id}</p>

                                    {project.skills.map((skill) => (
                                        <p>{skill.name}</p>
                                    ))}
                                    <p>{project.description}</p>
                                    <p>{project.price}</p>
                                    <br />
                                </li>
                            )
                    )}
                </ul>
                <h1>Rozpoczęte</h1>
                <ul>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 2 && (
                                <li>
                                    <p>{project.project_id}</p>
                                    <p>{project.category_id}</p>

                                    {project.skills.map((skill) => (
                                        <p>{skill.name}</p>
                                    ))}
                                    <p>{project.description}</p>
                                    <p>{project.price}</p>
                                    <button
                                        value={project.project_id}
                                        onClick={this.setStatusToDone}
                                    >
                                        Zakończ
                                    </button>
                                    <br />
                                </li>
                            )
                    )}
                </ul>
                <h1>Zakończone</h1>
                <ul>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 3 && (
                                <li>
                                    <p>{project.project_id}</p>
                                    <p>{project.category_id}</p>

                                    {project.skills.map((skill) => (
                                        <p>{skill.name}</p>
                                    ))}
                                    <p>{project.description}</p>
                                    <p>{project.price}</p>
                                    <br />
                                </li>
                            )
                    )}
                </ul>
            </div>
        );
    }
}
export default MyProjects;
