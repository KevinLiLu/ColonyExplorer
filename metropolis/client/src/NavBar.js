import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input, Menu } from 'semantic-ui-react';

class NavBar extends Component {
  render = () => {
    return (
        <Menu>
          <NavLink className="item" to="/">
            Colony Explorer
          </NavLink>
          <Menu.Menu position="right">
            <NavLink className="item" to="/manage">
              Manage
            </NavLink>
            <NavLink className="item" to="/colonies">
              Colonies
            </NavLink>
            <NavLink className="item" to="/tasks">
              Tasks
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
