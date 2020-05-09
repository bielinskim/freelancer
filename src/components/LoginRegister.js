import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Icon from "../icons/Icons";
import Login from "./Login";
import Register from "./Register";

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginOrRegister: "login" };
        this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
    }
    toggleLoginRegister(e) {
        this.setState({ loginOrRegister: e.target.value });
    }
    render() {
        if (this.state.loginOrRegister == "login")
            return <Login toggle={this.toggleLoginRegister} />;
        else {
            return <Register toggle={this.toggleLoginRegister} />;
        }
    }
}

export default LoginRegister;
