import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import NavBar from './NavBar';
import Home from './Home';
import Colonies from './Colonies';
import Colony from './Colony';
import Tasks from './Tasks';
import Task from './Task';
import Manage from './Manage';
import Skills from './Skills';
import Domains from './Domains';
import Skill from './Skill';
import Domain from './Domain';
import Invalid from './Invalid';

class App extends Component {
  render = () => {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/colonies" component={Colonies}/>
            <Route path="/invalid" component={Invalid}/>
            <Route path="/colony/:id" component={Colony}/>
            <Route path="/tasks" component={Tasks}/>
            <Route path="/task/:colonyId/:taskId" component={Task}/>
            <Route path="/manage" component={Manage}/>
            <Route path="/skills" component={Skills}/>
            <Route path="/skill/:skillId" component={Skill}/>
            <Route path="/domains" component={Domains}/>
            <Route path="/domain/:colonyId/:domainId" component={Domain}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
