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
        this.state = { loginOrRegister: "login", isLogged: false };
        this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.hideLoginRegister = this.hideLoginRegister.bind(this);
    }
    toggleLoginRegister(e) {
        this.setState({ loginOrRegister: e.target.value });
    }
    changeLoginStatus() {
        this.setState({ isLogged: true });
        this.props.changeStatus();
    }
    hideLoginRegister(e) {
        this.props.showhideLoginBox(e);
    }
    render() {
        if (this.state.loginOrRegister == "login")
            return (
                <Login
                    toggle={this.toggleLoginRegister}
                    changeStatus={this.changeLoginStatus}
                    hideLoginRegister={this.hideLoginRegister}
                />
            );
        else {
            return (
                <Register
                    toggle={this.toggleLoginRegister}
                    hideLoginRegister={this.hideLoginRegister}
                />
            );
        }
    }
}

export default LoginRegister;
