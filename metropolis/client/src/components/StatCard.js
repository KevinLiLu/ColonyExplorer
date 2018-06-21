import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
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

  renderData = async () => {
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
        <NavLink to={this.props.linkTo}>
          <Button>
            {this.props.buttonText}
          </Button>
        </NavLink>
        </Segment>
      </Grid.Column>
    );
  };
};

export default StatCard;
