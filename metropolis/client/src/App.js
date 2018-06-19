import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import NavBar from './Nav';
import Home from './Home';
import Colonies from './Colonies';
import Colony from './Colony';

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
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
