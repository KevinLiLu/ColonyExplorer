import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Menu } from 'semantic-ui-react';

import axios from 'axios';

import {
	withRouter
} from 'react-router-dom';

class NavBar extends Component {
  state = {
    searchInput: '',
  }

  submitSearch = async (event) => {
    event.preventDefault();

    let response = await axios.get(`/api/colony/id/${this.state.searchInput}`);
    if (response.data.id) {
      this.props.history.push(`/colony/${response.data.id}`);
    }
    else {
      this.props.history.push(`/invalid`);
    }
  };

  render = () => {
    return (
        <Menu>
          <NavLink className="item" to="/">
            Colony Explorer
          </NavLink>
          <Menu.Menu position="right">
            <NavLink className="item" to="/manage">
              <Icon name="edit" />
              Manage
            </NavLink>
            <NavLink className="item" to="/colonies">
              <Icon name="users" />
              Colonies
            </NavLink>
            <NavLink className="item" to="/tasks">
              <Icon name="tasks" />
              Tasks
            </NavLink>
            <NavLink className="item" to="/skills">
              <Icon name="wrench" />
              Skills
            </NavLink>
            <NavLink className="item" to="/domains">
              <Icon name="boxes" />
              Domains
            </NavLink>
            <Form className="item" onSubmit={this.submitSearch}>
              <Form.Input style={{paddingRight: 10}}
                placeholder='Search Colony Address'
                value={this.state.searchInput}
                onChange={event => this.setState({ searchInput: event.target.value })}
              />
            </Form>
          </Menu.Menu>
        </Menu>
    );
  }
}

export default withRouter(NavBar);
