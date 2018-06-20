import React, { Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';

class ConfigurableMessage extends Component {
  render = () => {
    return (
      <Message
        negative={this.props.negative}
        success={this.props.success}
        icon
        hidden={this.props.hidden}
      >
      <Icon
        name={this.props.iconName}
      />
      <Message.Content>
        <Message.Header>{this.props.header}</Message.Header>
        <p>{this.props.body}</p>
      </Message.Content>
    </Message>
    );
  };
};

export default ConfigurableMessage;
