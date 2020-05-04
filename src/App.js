import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Browse from "./components/Browse";
import List from "./components/List";
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/list" component={List} />
                </Switch>
            </Router>
        );
    }
}
export default App;
