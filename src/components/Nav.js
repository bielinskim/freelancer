import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }
    changeLoginStatus() {
        this.props.changeStatus();
    }
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <LoginLogout changeStatus={this.changeLoginStatus} />
            </div>
        );
    }
}
class LoginLogout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModal: "",
        };
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.showhideLoginBox = this.showhideLoginBox.bind(this);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }
    logout() {
        sessionStorage.setItem("isLogged", false);
        sessionStorage.setItem("userId", null);
        this.props.changeStatus();
        this.setState({ loginModal: "" });
    }
    changeLoginStatus() {
        this.props.changeStatus();
    }
    showhideLoginBox(e) {
        this.setState({ loginModal: "" });
    }
    login() {
        this.setState({
            loginModal: (
                <LoginRegister
                    changeStatus={this.changeLoginStatus}
                    showhideLoginBox={this.showhideLoginBox}
                />
            ),
        });
    }
    render() {
        if (sessionStorage.getItem("isLogged") == "true") {
            return <button onClick={this.logout}>Wyloguj sie</button>;
        } else {
            return (
                <div>
                    <button onClick={this.login}>Zaloguj sie</button>
                    {this.state.loginModal}
                </div>
            );
        }
    }
}
export default Navigation;
