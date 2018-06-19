import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';

import './Home.css';
import StatCard from './StatCard';
import StatGraph from './StatGraph';

class Home extends Component {
  state = {
    totalColonyCount: '',
    totalSkillCount: '',
    totalDomainCount: '',
    totalTaskCount: '',
    tsdTotalColonyCount: {
      labels: [],
      data: []
    },
    tsdTotalSkillCount: {
      labels: [],
      data: []
    },
    tsdTotalDomainCount: {
      labels: [],
      data: []
    },
    tsdTotalTaskCount: {
      labels: [],
      data: []
    }
  };

  componentDidMount() {
    this.renderData();
  }

  renderData = () => {
    this.renderStatisticsFromEthereum();
    this.renderStatisticsFromMongo();
    this.renderGraphsFromMongo();
  };

  renderStatisticsFromMongo = async () => {
    const data = (await axios.get('/api/statistics/mongo')).data;
    this.setState({
      totalDomainCount: data.totalDomainCount,
      totalTaskCount: data.totalTaskCount,
    });
  };

  renderStatisticsFromEthereum = async () => {
    const data = (await axios.get('/api/statistics/ethereum')).data;
    this.setState({
      totalColonyCount: data.totalColonyCount,
      totalSkillCount: data.totalSkillCount,
    });
  };

  renderGraphsFromMongo = async () => {
    const data = (await axios.get('/api/time-series-data/')).data;
    this.setState({
      tsdTotalColonyCount: data.totalColonyCount,
      tsdTotalSkillCount: data.totalSkillCount,
      tsdTotalDomainCount: data.totalDomainCount,
      tsdTotalTaskCount: data.totalTaskCount,
    });
  };

  render() {
    return (
      <Container textAlign='center'>
        <h1> Welcome to the Colony Explorer</h1>

        <Grid columns={4} relaxed>
          <StatCard
            title="Total # of Colonies"
            value={this.state.totalColonyCount}
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
            value={this.state.totalSkillCount}
            buttonText="View All Skills"
          />
        </Grid>

        <h1> Colony Network Trends</h1>

        <Grid columns={2} relaxed>
          <StatGraph
            title="Total Colony Count (Past 7 Days)"
            labels={this.state.tsdTotalColonyCount.labels}
            data={this.state.tsdTotalColonyCount.data}
          />
          <StatGraph
            title="Total Skill Count (Past 7 Days)"
            labels={this.state.tsdTotalSkillCount.labels}
            data={this.state.tsdTotalSkillCount.data}
          />
          <StatGraph
            title="Total Domain Count (Past 7 Days)"
            labels={this.state.tsdTotalDomainCount.labels}
            data={this.state.tsdTotalDomainCount.data}
          />
          <StatGraph
            title="Total Task Count (Past 7 Days)"
            labels={this.state.tsdTotalTaskCount.labels}
            data={this.state.tsdTotalTaskCount.data}
          />
        </Grid>
      </Container>
    );
  }
};

export default Home;
