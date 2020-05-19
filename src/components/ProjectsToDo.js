import React from "react";
import Nav from "./Nav";
import "./styles.css";
import { getProjectsToDo } from "./Util";

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
    componentDidUpdate() {
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
        }
    }
    async getProjectsToDo() {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getProjectsToDo(this.state.userId);
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                projects: result,
            });
        }
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <h1>Zaakceptowane</h1>
                <ul>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 2 && (
                                <li>
                                    <p>{project.login}</p>
                                    <p>{project.email}</p>

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
                <h1>Zakończone</h1>
                <ul>
                    {this.state.projects.map(
                        (project) =>
                            project.status_id == 3 && (
                                <li>
                                    <p>{project.login}</p>
                                    <p>{project.email}</p>

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
export default ProjectsToDo;
