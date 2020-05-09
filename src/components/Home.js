import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Icon from "../icons/Icons";
import LoginRegister from "./LoginRegister";

class Home extends React.Component {
    render() {
        return (
            <div>
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
                </style>
                <h2>Home</h2>
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
                <LoginRegister />
            </div>
        );
    }
}

export default Home;
