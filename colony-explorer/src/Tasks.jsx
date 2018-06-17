import React, { Component } from 'react';
import Nav from "./Nav.jsx";

class Task extends Component {

  render() {
    return(
      <div className= "section">
        <Nav />

        <br/>
        <h1> Task #</h1>

        <div className= "container">
        <p>Roles: </p>
        <p>Manager: </p>
        <p>Worker: </p>
        <p>Evaluator: </p>
        </div>

        <div className= "container">
        <h2>Payouts</h2>

        </div>

        <div className= "container">
        <h2>Details</h2>

        </div>
      </div>
    )
  }
}

  export default Task;




