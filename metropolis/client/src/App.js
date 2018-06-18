import React, { Component } from 'react';
import axios from 'axios';

import { Grid } from 'semantic-ui-react';

import './App.css';
import Nav from './Nav.js';
import StatCard from './StatCard';

class App extends Component {
  state = {
    totalDomainCount: '',
    totalTaskCount: '',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const data = (await axios.get('/api/statistics')).data;
    const str = JSON.stringify(data);
    this.setState({
      totalDomainCount: data.statistics.totalDomainCount,
      totalTaskCount: data.statistics.totalTaskCount,
    });
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <h1> Welcome to the Colony Explorer</h1>

        <Grid columns={4} relaxed>
          <StatCard
            title="Total # of Colonies"
            value="5,555"
            buttonText="View All Colonies"
          />
          <StatCard
            title="Total # of Tasks"
            value={this.state.totalTaskCount}
            buttonText="View All Tasks"
          />
          <StatCard
            title="Total # of Domains"
            value={this.state.totalDomainCount}
            buttonText="View All Domains"
          />
          <StatCard
            title="Total # of Skills"
            value="5,555"
            buttonText="View All Skills"
          />
        </Grid>

        {/* TODO: GRAPHS SECTION */}

      </div>
    );
  }
}

export default App;
