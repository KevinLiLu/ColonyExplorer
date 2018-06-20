import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';

import StatCard from './StatCard';

class Colony extends Component {


  state = {
    address: '',
    token: '',
    totalDomainCount: '',
    totalTaskCount: '',
    totalRewardPot: '',
    totalNonRewardPot: '',
    topDomains: {
      labels: [],
      data: []
    },
    topTasks: {
      labels: [],
      data: []
    }
  };

  componentDidMount = () => {
    this.renderData();
  }


  renderData = () => {
    this.renderAddressFromEthereum();
    this.renderDomainFromEthereum();
    this.renderTasksFromEthereum();
    this.renderRewardPotFromEthereum();
    this.renderTokenFromEthereum();
  };


renderAddressFromEthereum = async () => {
    const data = (await axios.get('/colony/address/:id')).data;
    this.setState({
      address: data.address
    });
  };

renderDomainFromEthereum = async () => {
    const data = (await axios.get('/colony/domain/')).data;
    this.setState({
      totalDomainCount: data.totalDomainCount,
    });
  };

renderTasksFromEthereum = async () => {
    const data = (await axios.get('/colony/skills')).data;
    this.setState({
      totalSkillCount: data.totalTaskCount,
    });
  };

renderRewardPotFromEthereum = async () => {
    const data = (await axios.get('/colony/reward-pot')).data;
    this.setState({
      totalRewardPot: data.totalRewardPot,
    });
  };

renderNonRewardPotFromEthereum = async () => {
    const data = (await axios.get('/colony/non-reward-pot')).data;
    this.setState({
      totalNonRewardPot: data.totalNonRewardPot
    });
  };

renderTokensFromEthereum = async () => {
    const data = (await axios.get('/colony/token')).data;
    this.setState({
      token: data.token,
    });
  };

  render() {
    return(

     <Container textAlign='center'>

        <h1>Colony {this.props.match.params.id}</h1>
        <h2>Address: {this.state.address}</h2>
        <h3>Token: {this.state.token}</h3>


      <Grid columns={4} relaxed>
          <StatCard
            title="Total # of Domains"
            value={ this.state.totalDomainCount }
            buttonText="View All Domains"
          />
          <StatCard
            title="Total # of Tasks"
            value={ this.state.totalTask }
            buttonText="View All Tasks"
          />
          <StatCard
            title="Reward Pot"
            value={ this.state.totalRewardPot }
          />
          <StatCard
            title="Non-Reward Pot"
            value={ this.state.totalNonRewardPot }
          />
        </Grid>

      <article className="message is-info">
        <div className="message-header">
         <p>Domain</p>
        </div>
        <div className="message-body">
        List of top 5 Domains
        </div>
        <a href="#">View All Domains</a>. <a href="#">#css</a> <a href="#">#responsive</a>
      </article>

      <article className="message is-info">
        <div className="message-header">
         <p>Tasks</p>
        </div>
        <div className="message-body">
        List of top 5 Taks
        </div>
        <a href="#">View All Tasks</a>. <a href="#">#css</a> <a href="#">#responsive</a>
      </article>

    </Container>

    )
  }
}

export default Colony;
