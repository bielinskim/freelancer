import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Browse from "./components/Browse";
import List from "./components/List";
import Project from "./components/Project";
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
                </Switch>
            </Router>
        );
    }
}
export default App;
