import React from "react";
import Nav from "./Nav";
import offersdata from "./offersdata.json";
import "./test.css";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: {
                id: this.props.location.state.data.project_id,
                category: this.props.location.state.data.category_id,
                skills: this.props.location.state.data.skills,
                desc: this.props.location.state.data.description,
                price: this.props.location.state.data.price,
            },
            offers: offersdata,
        };
    }
    componentDidMount() {
        //this.browseProjects();
    }
    // browseProjects() {
    //     alert("test");
    //     var body = {
    //         category: this.state.category,
    //         skills: this.state.skills,
    //     };
    //     const requestOptions = {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(body),
    //     };
    //     fetch("http://localhost:8080/projects", requestOptions)
    //         .then((res) => res.json())
    //         .then((result) => {
    //             // this.setState({
    //             //     isLoaded: true,
    //             //     skills: result,
    //             // });
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // }
    render() {
        return (
            <div>
                <Nav />
                <ProjectView projectData={this.state.projectData} />
                {this.state.offers.map((item) => (
                    <div>
                        <p>{item.id}</p>
                        <p>{item.firstname}</p>
                        <p>{item.lastname}</p>
                        <p>{item.skills}</p>
                        <p>{item.offer}</p>
                        <p>{item.price}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Project;

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { projectData: props.projectData };
    }
    render() {
        return <p>{this.state.projectData.price}</p>;
    }
}
