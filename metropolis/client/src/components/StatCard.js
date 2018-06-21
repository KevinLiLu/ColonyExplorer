import React, { Component } from 'react'
import { Button, Grid, Loader, Segment, Statistic, } from 'semantic-ui-react';
import axios from 'axios';

class StatCard extends Component {
  state = {
    value: '',
    loading: false,
  };

  componentDidMount() {
    this.renderData();
  };

  async renderData() {
    this.setState({ loading: true });
    const response = (await axios.get(this.props.api));
    this.setState({
      value: Object.values(response.data)[0],
      loading: false,
    });
  };

  render = () => {
    return (
      <Grid.Column>
        <Segment basic>
          <h3>{this.props.title}</h3>
        </Segment>
        <Segment basic>
          <Loader active={this.state.loading} />
          <Statistic>
            <Statistic.Value>{this.state.value}</Statistic.Value>
          </Statistic>
        </Segment>
        <Segment basic>
          <Button>
            {this.props.buttonText}
          </Button>
        </Segment>
      </Grid.Column>
    );
  };
};

export default StatCard;
