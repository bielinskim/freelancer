import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Browse from "./components/Browse";
import List from "./components/List";
import Project from "./components/Project";
import MyProjects from "./components/MyProjects.js";
import ProjectsToDo from "./components/ProjectsToDo.js";
import ProjectsManager from "./components/ProjectsManager.js";
import OffersManager from "./components/OffersManager.js";
import Admin from "./components/Admin.js";
import EditProject from "./components/EditProject.js";
import EditOffer from "./components/EditOffer.js";
import EditUser from "./components/EditUser.js";
import AddUser from "./components/AddUser.js";

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
          <Route path="/myprojects" component={MyProjects} />
          <Route path="/projectstodo" component={ProjectsToDo} />
          <Route path="/projectsmanager" component={ProjectsManager} />
          <Route path="/offersmanager" component={OffersManager} />
          <Route path="/editproject" component={EditProject} />
          <Route path="/editoffer" component={EditOffer} />
          <Route path="/admin" component={Admin} />
          <Route path="/edituser" component={EditUser} />
          <Route path="/adduser" component={AddUser} />
        </Switch>
      </Router>
    );
  }
}
export default App;
