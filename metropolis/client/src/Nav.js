import React, { Component } from 'react';
import { Button, Form, Input, Menu } from 'semantic-ui-react';

class Nav extends Component {
  render() {
    return (
      <Menu>
        <a className="item">
          Colony Explorer
        </a>
        <Menu.Menu position="right">
          <a className="item">
            Tasks
          </a>
          <a className="item">
            Colonies
          </a>
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

export default Nav;
