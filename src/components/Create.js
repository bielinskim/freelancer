import React from "react";
import Nav from "./Nav";
import Skill from "../models/Skill";
import Category from "../models/Category";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                new Category(1, "IT"),
                new Category(2, "Budownictwo"),
                new Category(3, "Usługi kosmetyczne"),
            ],
            skills: [
                new Skill(1, "Skill1"),
                new Skill(2, "Skill2"),
                new Skill(3, "Skill3"),
            ],
            desc: "",
            price: 0,
        };
    }
    componentDidMount() {
        var recievedMessage = this.props.location.state.message;
        alert(recievedMessage);
    }
    render() {
        return <Nav />;
    }
}

export default Create;
