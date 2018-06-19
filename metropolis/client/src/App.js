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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/colonies" component={Colonies}/>
            <Route path="/colony/:id" component={Colony}/>
            <Route path="/tasks" component={Tasks}/>
            <Route path="/task/:id" component={Task}/>
            <Route path="/manage" component={Manage}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
