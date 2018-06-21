import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, Icon, Input, Menu } from 'semantic-ui-react';

class NavBar extends Component {
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
            <Form className="item">
              <Input style={{ marginRight: '10px' }}
                value=""
              />
              <Button primary>
                Search
              </Button>
            </Form>
          </Menu.Menu>
        </Menu>
    );
  }
}

export default NavBar;
