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
    }
    componentDidMount() {
        this.getUsers();
        this.getRoles();
    }
    componentDidUpdate() {
        this.getUsers();
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
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <ul>
                    {this.state.users.map((user) => (
                        <li>
                            <p>{user.login}</p>

                            <p>{user.email}</p>
                            <p>{user.role_id}</p>
                            <button
                                value={user.user_id}
                                onClick={this.deleteUser}
                            >
                                Usuń
                            </button>

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

                            <br />
                        </li>
                    ))}
                </ul>
                <Link
                    to={{
                        pathname: "/adduser",
                    }}
                >
                    <button>Dodaj</button>
                </Link>
            </div>
        );
    }
}
export default Admin;
