import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Create from "./components/Create";
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/form/:type" component={Form} />
                    <Route path="/create" component={Create} />
                </Switch>
            </Router>
        );
    }
}
export default App;
