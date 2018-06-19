import React, { Component } from 'react';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from './logo.jpeg';
import Colony from './Colony.jsx';
import Tasks from './Tasks.jsx';


class Nav extends Component {
  render() {

  // if auth is true (implied login is verified), render the link to dashboard
  // if auth is false, don't render the link
  // console.log(props.auth)
  // const link = props.auth ? <NavLink activeClassName="is-active" className="navbar-item" to="/dash"><h2 className="is-size-5">Miner Dashboard</h2></NavLink> : null;

  return (
    <div className= "navBar">
    <div className="container">
      <section className="hero">
        <nav className="navbar">
          <img className="logo" src={logo} alt="Logo" />
          <div id="navbarMenuHeroA" className="navbar-menu">

            <div className="navbar-end">
              <a className="navbar-item" href="#">Tasks</a>
            <br />
            <br />
              <a className="navbar-item" href="#">Colonies</a>

              <a className="navbar-item">
              <div class="field is-grouped">
               <p class="control is-expanded">
              <input class="input" type="text" placeholder="Address" />
                </p>
               <p class="control">
                 <a class="button is-info" >
                 Search
                 </a>
                </p>
               </div>
               </a>

    </div>
    </div>
    </nav>
    </section>
    </div>
    </div>
  );
  }
}

export default Nav;

