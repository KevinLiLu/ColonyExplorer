import React, { Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';

class DismissableMessage extends Component {
  state = { visible: true };

  handleDismiss = () => {
    this.setState({ visible: false })
  };

  render = () => {
    if (this.state.visible) {
      return (
        <Message
          negative={this.props.negative}
          success={this.props.success}
          icon
          hidden={this.props.hidden}
          onDismiss={this.handleDismiss}
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
    }
  };
};

export default DismissableMessage;
