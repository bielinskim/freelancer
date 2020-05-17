import React from "react";
import Nav from "./Nav";
import { getMyProjects, setStatusToDone } from "./Util";

import "./styles.css";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }
    componentDidMount() {}
    componentDidUpdate() {}
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
    }

    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
            </div>
        );
    }
}
export default Admin;
