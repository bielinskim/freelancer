import React from "react";
import Nav from "./Nav";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.location.state.category,
            skills: this.props.location.state.skills,
        };
    }
    componentDidMount() {
        this.browseProjects();
    }
    browseProjects() {
        alert("test");
        var body = {
            category: this.state.category,
            skills: this.state.skills,
        };
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/projects", requestOptions)
            .then((res) => res.json())
            .then((result) => {
                // this.setState({
                //     isLoaded: true,
                //     skills: result,
                // });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    render() {
        return (
            <div>
                <Nav />
                <p>{this.state.category}</p>
                <p>{this.state.skills}</p>
            </div>
        );
    }
}

export default List;
