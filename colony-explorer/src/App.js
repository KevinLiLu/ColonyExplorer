import React, { Component } from 'react';
import logo from './logo.jpeg';
import {Bar,Line,Pie} from 'react-chartjs-2';
import './App.css';
// import 'semantic-ui-css/sematic.min.css';
import Nav from './Nav.jsx';
import DividerVertical from './Totals.jsx';

                // <Line
                  // data=
                  // options={{

                  // }}
                  // />

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <h1> Welcome to the Colony Explorer</h1>
        <DividerVertical />


        <div className="tile is-parent is-fullwidth">
          <article className="tile is-child notification backdrop">
          <p className="title">Graph</p>

          </article>

        </div>

        <div className="container">



        </div>



      </div>
    );
  }
}

export default App;
