import React from "react";
import Nav from "./Nav";
import Icon from "../icons/Icons";
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
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    {this.state.data.map((item) => (
                        <div className="list-project-container">
                            <Link
                                className="list-project"
                                to={{
                                    pathname: "/project",
                                    state: {
                                        data: item,
                                    },
                                }}
                            >
                                <div className="project-list-details">
                                    <div className="project-list-author">
                                        <b>{item.login}</b>
                                    </div>
                                    <div className="project-list-price">
                                        {item.price} PLN
                                    </div>
                                    <div className="project-list-category">
                                        <Icon icon={item.icon} />
                                        <b>
                                            <div>{item.name}</div>
                                        </b>
                                    </div>
                                    <div className="project-list-skills">
                                        {item.skills.map((skill) => (
                                            <div>{skill.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="project-list-desc">
                                    <p>{item.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default List;
