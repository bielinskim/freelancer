import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import { DropdownItem } from "reactstrap";

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
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top navbar-inverse">
                    <ul class="nav navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li class="nav-item">
                            {sessionStorage.getItem("isLogged") == "true" && (
                                <Link class="nav-link" to="/myprojects">
                                    Moje projekty
                                </Link>
                            )}
                        </li>
                        <li class="nav-item">
                            {sessionStorage.getItem("isLogged") == "true" && (
                                <Link class="nav-link" to="/projectstodo">
                                    Do zrobienia
                                </Link>
                            )}
                        </li>
                        {(sessionStorage.getItem("roleId") == "1" ||
                            sessionStorage.getItem("roleId") == "2") && (
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbardrop"
                                    data-toggle="dropdown"
                                >
                                    Panel pracownika
                                </a>
                                <div class="dropdown-menu">
                                    <Link
                                        class="dropdown-item nav-link"
                                        to="/projectsmanager"
                                    >
                                        Projekty
                                    </Link>
                                    <Link
                                        class="dropdown-item nav-link"
                                        to="/offersmanager"
                                    >
                                        Oferty
                                    </Link>
                                </div>
                            </li>
                        )}
                        <li class="nav-item">
                            {sessionStorage.getItem("roleId") == "1" && (
                                <Link class="nav-link" to="/admin">
                                    Panel admina
                                </Link>
                            )}
                        </li>
                    </ul>
                    <ul class="nav navbar-nav ml-auto">
                        {sessionStorage.getItem("isLogged") == "true" && (
                            <span class="nav-logged-as navbar-text">
                                Jesteś zalogowany jako{" "}
                                <b> {sessionStorage.getItem("login")} </b>
                            </span>
                        )}
                        <li>
                            <LoginLogout
                                changeStatus={this.changeLoginStatus}
                            />
                        </li>
                    </ul>
                </nav>
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
        sessionStorage.setItem("roleId", null);
        sessionStorage.setItem("login", null);
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
            return (
                <button class="btn btn-secondary" onClick={this.logout}>
                    Wyloguj się
                </button>
            );
        } else {
            return (
                <div>
                    <button class="btn btn-secondary" onClick={this.login}>
                        Logowanie | Rejestracja
                    </button>
                    {this.state.loginModal}
                </div>
            );
        }
    }
}
export default Navigation;
