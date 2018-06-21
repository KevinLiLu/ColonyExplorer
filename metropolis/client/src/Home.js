import React, { Component } from 'react';
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
            name="total-colony-count"
          />
          <StatGraph
            title="Total Skill Count (Past 7 Days)"
            labels={this.state.tsdTotalSkillCount.labels}
            data={this.state.tsdTotalSkillCount.data}
            loading={this.state.graphsLoading}
            name="total-skill-count"
          />
          <StatGraph
            title="Total Domain Count (Past 7 Days)"
            labels={this.state.tsdTotalDomainCount.labels}
            data={this.state.tsdTotalDomainCount.data}
            loading={this.state.graphsLoading}
            name="total-domain-count"
          />
          <StatGraph
            title="Total Task Count (Past 7 Days)"
            labels={this.state.tsdTotalTaskCount.labels}
            data={this.state.tsdTotalTaskCount.data}
            loading={this.state.graphsLoading}
            name="total-task-count"
          />
        </Grid>
      </Container>
    );
  }
};

export default Home;
