import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../icons/icons.css";

class Home extends React.Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <ul>
                    <li>
                        <Link to="/browse">Znajdz prace</Link>
                    </li>
                    <li>
                        <Link to="/create">Daj prace</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;
