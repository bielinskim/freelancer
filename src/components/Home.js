import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
            <div className="home-background">
                <div className="home-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <div className="home-desc-container">
                        <h1 className="home-title-title">
                            <b>Usługi</b> freelancerskie.
                        </h1>
                        <p className="home-title-desc">
                            Znajdź lub zleć pracę.
                        </p>
                    </div>
                    <div className="home-button-container">
                        <Link to="/browse">
                            <button className="home-button">Znajdź</button>
                        </Link>
                        <span></span>
                        <Link to="/create">
                            <button className="home-button">Zleć</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
