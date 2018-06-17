import React, { Component } from 'react';
import Nav from "./Nav.jsx";

class Colony extends Component {

  render() {
    return(
      <div className= "section">
      <Nav />
      <div className="container">
        <h1>Colony #</h1>
        <h2>Address:</h2>
        <h3>Token:</h3>
      </div>

      <div className="container">

      <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          Total # of Domains
        </p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          This would be the number of colonies.
          <a href="#">View All Domains</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>


        <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          Total # of Tasks
        </p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          This would be the number of colonies.
          <a href="#">View All Tasks</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>


          <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          Reward Pot
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          This would be the reward pot.
          <a href="#">Reward Pot</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>

      <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          Non-Reward Pot
        </p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span class="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          This would be the non-reward pot
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          </div>
          </div>
          </div>

      <article className="message is-info">
        <div className="message-header">
         <p>Domain</p>
        </div>
        <div className="message-body">
        List of top 5 Domains
        </div>
        <a href="#">View All Domains</a>. <a href="#">#css</a> <a href="#">#responsive</a>
      </article>

      <article className="message is-info">
        <div className="message-header">
         <p>Tasks</p>
        </div>
        <div className="message-body">
        List of top 5 Taks
        </div>
        <a href="#">View All Tasks</a>. <a href="#">#css</a> <a href="#">#responsive</a>
      </article>

      </div>
      </div>

    )
  }
}

export default Colony;
