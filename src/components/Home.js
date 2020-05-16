import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Icon from "../icons/Icons";
import Nav from "./Nav";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }
    changeLoginStatus() {
        this.setState({ isLogged: sessionStorage.getItem("isLogged") });
    }
    render() {
        return (
            <div>
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
                </style>
                <h2>Home</h2>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <div className="home-select-box">
                    <Link to="/browse">
                        <div className="home-item-container">
                            <Icon icon="search" />
                            <p>Szukaj</p>
                        </div>
                    </Link>
                    <div className="home-item-separ"></div>
                    <Link to="/create">
                        <div className="home-item-container">
                            <Icon icon="create" />
                            <p>Stwórz</p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;
