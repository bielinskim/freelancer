import React from "react";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getRoles } from "./Util";
import "./styles.css";
var SHA256 = require("crypto-js/sha256");

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            user: { login: "", password: "", email: "", role_id: 2 },
            roles: [],
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getRoles();
    }
    componentDidUpdate() {}
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
    }
    async getRoles() {
        const result = await getRoles();
        this.setState({
            roles: result,
        });
    }
    handleChange(e) {
        var user = this.state.user;
        switch (e.target.id) {
            case "edit-login":
                user.login = e.target.value;
                break;
            case "edit-password":
                user.password = e.target.value;
                break;
            case "edit-email":
                user.email = e.target.value;
                break;
            case "edit-role":
                user.role_id = e.target.value;
                break;
        }
        this.setState({ user: user });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (
            this.state.user.login.length == 0 &&
            this.state.user.password.length == 0 &&
            this.state.user.email.length == 0
        ) {
            return alert("Wprowadź dane");
        }
        if (this.state.user.password.length > 4) {
            var user = this.state.user;
            user.password = SHA256(this.state.user.password).toString();
            this.setState({ user: user });
        }
        var body = {
            login: this.state.user.login,
            password: this.state.user.password,
            mail: this.state.user.email,
            role: this.state.user.role_id,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/register", requestOptions).then(() =>
            alert("Dodano")
        );
        var user = this.state.user;
        user.login = "";
        user.password = "";
        user.email = "";
        user.role_id = 2;
        this.setState({ user: user });
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <Link to="/admin">Powrót</Link>
                <br />
                {sessionStorage.getItem("userId") != "null" && (
                    <form onSubmit={this.handleSubmit}>
                        <input
                            id="edit-login"
                            type="text"
                            minlength="5"
                            value={this.state.user.login}
                            onChange={this.handleChange}
                        ></input>
                        <br />

                        <input
                            id="edit-password"
                            type="password"
                            placeholder="*******"
                            minlength="5"
                            value={this.state.user.password}
                            onChange={this.handleChange}
                        ></input>
                        <br />
                        <input
                            id="edit-email"
                            type="email"
                            minlength="5"
                            value={this.state.user.email}
                            onChange={this.handleChange}
                        ></input>
                        <br />
                        {this.state.roles.length != 0 && (
                            <select id="edit-role">
                                <option value={this.state.roles[0].role_id}>
                                    {this.state.roles[0].name}
                                </option>
                                <option value={this.state.roles[1].role_id}>
                                    {this.state.roles[1].name}
                                </option>
                                <option
                                    selected="selected"
                                    value={this.state.roles[2].role_id}
                                >
                                    {this.state.roles[2].name}
                                </option>
                            </select>
                        )}
                        <br />
                        <button type="submit">Wyślij</button>
                        <br />
                    </form>
                )}
            </div>
        );
    }
}
export default EditUser;
