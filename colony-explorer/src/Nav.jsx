import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { NavLink } from 'react-router-dom';


export default function Nav(props) {
  // if auth is true (implied login is verified), render the link to dashboard
  // if auth is false, don't render the link
  console.log(props.auth)
  // const link = props.auth ? <NavLink activeClassName="is-active" className="navbar-item" to="/dash"><h2 className="is-size-5">Miner Dashboard</h2></NavLink> : null;
  return (
    <div className= "navBar">
    <div className="container">
      <section className="hero">
        <nav className="navbar">
          <img className="logocoin" src="http://res.cloudinary.com/dm6ofsjtd/image/upload/v1526264757/coin.png" alt="Logo" />
          <img className="logo" src="http://res.cloudinary.com/dm6ofsjtd/image/upload/v1526250335/logocr.png" alt="Logo" />
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">

              <NavLink activeClassName="is-active" className="navbar-item" to="/"><h2 className="is-size-5">Home</h2></NavLink>
               {(!props.auth) ? (
              <NavLink activeClassName="is-active" className="navbar-item" to="/login">
              <h2 className="is-size-5">Tasks</h2>

              <div class="field is-grouped">
               <p class="control is-expanded">
              <input class="input" type="text" placeholder="Find a repository" />
                </p>
               <p class="control">
                 <a class="button is-info">
                 Search
                 </a>
                </p>
               </div>

              </NavLink>
             ) :
              (<span/>)}
              {(!props.auth) ? (
                 <NavLink activeClassName="is-active" className="navbar-item" to="/register">
              <h2 className="is-size-5">Colonies</h2>
              </NavLink>) :(<span/>)}
              <span className="navbar-item" />
            </div>
          </div>
        </nav>
      </section>
    </div>

    </div>
  );
}

export default Nav;
