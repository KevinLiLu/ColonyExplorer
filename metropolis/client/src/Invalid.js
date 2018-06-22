import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import ConfigurableMessage from './components/ConfigurableMessage';

class Invalid extends Component {
  render = () => {
    return (
      <Container>
      <ConfigurableMessage
        hidden={false}
        iconName='warning circle'
        header='Error!'
        body={"Oops, your search query returned no results."}
        negative={true}
        success={false}
      />
      </Container>
    );
  };
};

export default Invalid;
