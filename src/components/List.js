import React from "react";
import Nav from "./Nav";
import "./test.css";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.location.state.category,
            skills: this.props.location.state.skills,
            data: [],
        };
        this.browseProjects = this.browseProjects.bind(this);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }

    componentDidMount() {
        this.browseProjects();
    }
    browseProjects() {
        fetch("http://localhost:8080/projectsbyskills/" + this.state.skills)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    hasError: true,
                    data: result,
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    changeLoginStatus() {
        this.setState({ isLogged: sessionStorage.getItem("isLogged") });
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                {this.state.data.map((item) => (
                    <Link
                        className="test"
                        to={{
                            pathname: "/project",
                            state: {
                                data: item,
                            },
                        }}
                    >
                        <p>{item.project_id}</p>
                        <p>{item.category_id}</p>

                        {item.skills.map((skill) => (
                            <p>{skill.name}</p>
                        ))}
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        <br />
                    </Link>
                ))}
            </div>
        );
    }
}

export default List;
