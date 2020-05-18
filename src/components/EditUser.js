import React from "react";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getRoles } from "./Util";
import "./styles.css";
var SHA256 = require("crypto-js/sha256");

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            user: this.props.location.state.user,
            roles: [],
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        var user = this.state.user;
        user.newpassword = "";
        this.setState({ user: user });
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
                user.newpassword = e.target.value;
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
        if (this.state.user.newpassword.length > 4) {
            var user = this.state.user;
            user.password = SHA256(this.state.user.newpassword).toString();
            this.setState({ user: user });
        }
        var body = {
            user_id: this.state.user.user_id,
            login: this.state.user.login,
            password: this.state.user.password,
            email: this.state.user.email,
            role_id: this.state.user.role_id,
        };
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/edituser", requestOptions).then(() =>
            alert("Zedytowano")
        );
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
                                <option value={this.state.roles[2].role_id}>
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
export default AddUser;
