import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';

import './css/Home.css';
import StatCard from './components/StatCard';
import StatGraph from './components/StatGraph';

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
    },
    graphsLoading: false,
  };

  componentDidMount = () => {
    this.renderData();
  }

  renderData = () => {
    this.renderGraphsFromMongo();
  };

  renderGraphsFromMongo = async () => {
    this.setState({ graphsLoading: true });
    const data = (await axios.get('/api/time-series-data/')).data;
    this.setState({
      tsdTotalColonyCount: data.totalColonyCount,
      tsdTotalSkillCount: data.totalSkillCount,
      tsdTotalDomainCount: data.totalDomainCount,
      tsdTotalTaskCount: data.totalTaskCount,
      graphsLoading: true,
    });
  };

  render = () => {
    return (
      <Container textAlign='center'>
        <h1> Welcome to the Colony Explorer</h1>

        <Grid columns={4} relaxed>
          <StatCard
            title="Total # of Colonies"
            value={this.state.totalColonyCount}
            buttonText="View All Colonies"
            api="/api/network/count/colony"
          />
          <StatCard
            title="Total # of Tasks"
            value={this.state.totalTaskCount}
            buttonText="View All Tasks"
            api="/api/network/count/task"
          />
          <StatCard
            title="Total # of Domains"
            value={this.state.totalDomainCount}
            buttonText="View All Domains"
            api="/api/network/count/domain"
          />
          <StatCard
            title="Total # of Skills"
            value={this.state.totalSkillCount}
            buttonText="View All Skills"
            api="/api/network/count/skill"
          />
        </Grid>

        <h1> Colony Network Trends</h1>

        <Grid columns={2} relaxed>
          <StatGraph
            title="Total Colony Count (Past 7 Days)"
            labels={this.state.tsdTotalColonyCount.labels}
            data={this.state.tsdTotalColonyCount.data}
            loading={this.state.graphsLoading}
          />
          <StatGraph
            title="Total Skill Count (Past 7 Days)"
            labels={this.state.tsdTotalSkillCount.labels}
            data={this.state.tsdTotalSkillCount.data}
            loading={this.state.graphsLoading}
          />
          <StatGraph
            title="Total Domain Count (Past 7 Days)"
            labels={this.state.tsdTotalDomainCount.labels}
            data={this.state.tsdTotalDomainCount.data}
            loading={this.state.graphsLoading}
          />
          <StatGraph
            title="Total Task Count (Past 7 Days)"
            labels={this.state.tsdTotalTaskCount.labels}
            data={this.state.tsdTotalTaskCount.data}
            loading={this.state.graphsLoading}
          />
        </Grid>
      </Container>
    );
  }
};

export default Home;
