import React from "react";
import Nav from "./Nav";
import { getProjectsByDate, deleteProject } from "./Util";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";

class Employee extends React.Component {
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
        this.getProjectsByDate();
    }
    componentDidUpdate() {
        this.getProjectsByDate();
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
    setPeriodOfData(e) {
        this.setState({ periodOfData: e.target.value });
    }
    async deleteProject(e) {
        await deleteProject(e.target.value);
        this.setState({
            update: this.state.update + 1,
        });
    }
    async getProjectsByDate() {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getProjectsByDate(this.state.periodOfData);
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
                <button value={1} onClick={this.setPeriodOfData}>
                    Dzień
                </button>
                <button value={7} onClick={this.setPeriodOfData}>
                    Tydzień
                </button>
                <button value={31} onClick={this.setPeriodOfData}>
                    Miesiac
                </button>
                <button value={365} onClick={this.setPeriodOfData}>
                    Rok
                </button>
                <button value={9999} onClick={this.setPeriodOfData}>
                    Wszystkie
                </button>
                <ul>
                    {this.state.projects.map((project) => (
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
                                <button>Edytuj</button>
                            </Link>

                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Employee;
