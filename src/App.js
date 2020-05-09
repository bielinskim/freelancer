import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Browse from "./components/Browse";
import List from "./components/List";
import Project from "./components/Project";
import Login from "./components/Login";
import Register from "./components/Register";
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/list" component={List} />
                    <Route path="/project" component={Project} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
        );
    }
}
export default App;
