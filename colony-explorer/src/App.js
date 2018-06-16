import React, { Component } from 'react';
import logo from './logo.svg';
import {Bar,Line,Pie} from 'react-chartjs-2';
import './App.css';
import Nav from './Nav.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <h1> Welcome to the Colony Explorer</h1>
        <div className="container">

        <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Total # of Colonies
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          This would be the number of colonies.
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>

           <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Total # of Tasks
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          This would be the number of tasks
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>

       <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Total # of Skills
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          This would be the number of skills.
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>

      <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Total # of Domains
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          This would be the number of domains.
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>

          </div>

          <div className="container">

            <div className="tile is-parent is-7">
              <article className="tile is-child notification backdrop">
                <p className="title">Graph</p>
                <Line
                  data= 0
                  options={{

                  }}
                  />
              </article>

           </div>

           </div>

            <div className="container">



            </div>


      </div>
    );
  }
}

export default App;
