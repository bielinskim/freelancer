import React from "react";
import Nav from "./Nav";
import { getUsers, getRoles, deleteUser } from "./Util";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            roles: [],
            users: [],
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }
    componentDidMount() {
        this.getUsers();
        this.getRoles();
    }
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
    }
    async deleteUser(e) {
        await deleteUser(e.target.value);
        this.setState({
            update: this.state.update + 1,
        });
        this.getUsers();
    }
    async getUsers() {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getUsers();
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                users: result,
            });
        }
    }
    async getRoles() {
        const result = await getRoles();
        this.setState({
            roles: result,
        });
    }
    render() {
        return (
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <table class="admin-panel-users-table">
                        <tbody>
                            <tr>
                                <th>Login</th>
                                <th>Email</th>
                                <th>Rola</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {this.state.users.map((user) => (
                                <tr>
                                    <td>{user.login}</td>

                                    <td>{user.email}</td>
                                    <td>{user.role_name}</td>
                                    <td>
                                        <button
                                            value={user.user_id}
                                            onClick={this.deleteUser}
                                        >
                                            Usuń
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: "/edituser",
                                                state: {
                                                    user: user,
                                                },
                                            }}
                                        >
                                            <button>Edytuj</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <Link
                        to={{
                            pathname: "/adduser",
                        }}
                    >
                        <button className="global-button">Dodaj</button>
                    </Link>
                    <Link to="/">
                        <button className="global-button">Powrót</button>
                    </Link>
                </div>
            </div>
        );
    }
}
export default Admin;
