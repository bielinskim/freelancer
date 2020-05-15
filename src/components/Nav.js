import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Logout nav={this.props} />
                    </li>
                </ul>
            </div>
        );
    }
}
class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }
    logout() {
        sessionStorage.setItem("isLogged", false);
        sessionStorage.setItem("userId", null);
        this.props.nav.logout();
    }
    render() {
        if (this.props.nav.isLogged == "true") {
            return <button onClick={this.logout}>Wyloguj sie</button>;
        } else {
            return <div></div>;
        }
    }
}
export default Navigation;
