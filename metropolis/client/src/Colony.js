import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';


import StatCard from './components/StatCard';

class Colony extends Component {

  state = {
    address: '',
    token: '',
    finishedLoading: false,
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



renderStatisticsFromEthereum = async () => {
    const data = (await axios.get('/api/statistics/ethereum')).data;
    this.setState({
      totalColonyCount: data.totalColonyCount,
      totalSkillCount: data.totalSkillCount,
    });
  };


  componentDidMount = () => {
    this.renderData();
  };


  renderData = () => {
    this.renderAddressFromEthereum();
    this.renderDomainFromEthereum();
    // this.renderTasksFromEthereum();
    // this.renderRewardPotFromEthereum();
    this.renderTokensFromEthereum();
    this.renderTokenListFromEthereum();
    this.renderDomainListFromEthereum();
  };


renderAddressFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/address/${this.props.match.params.id}`));
    this.setState({
      address: res.data.address
    });
  };

renderDomainFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/domain/${this.props.match.params.id}`));
    console.log('this is Domain', res.data.totalDomainCount.count)

    this.setState({
      totalDomainCount: res.data.totalDomainCount.count
    });
  };

// renderTasksFromEthereum = async () => {
//     const data = (await axios.get('/api/colony/tasks'));
//     this.setState({
//       totalTaskCount: data.totalTaskCount
//     });
//   };

// renderRewardPotFromEthereum = async () => {
//     const data = (await axios.get('/api/colony/reward-pot')).totalRewardPot;
//     this.setState({
//       totalRewardPot: data
//     });
//   };

// renderNonRewardPotFromEthereum = async () => {
//     const data = (await axios.get('/api/colony/non-reward-pot')).totalNonRewardPot;
//     this.setState({
//       totalNonRewardPot: data
//     });
//   };

renderTokensFromEthereum = async () => {
    const res = (await axios.get(`/api/token/colonyId/${this.props.match.params.id}`));
    console.log('this is tokens', res)
    this.setState({
      token: res.data.name + ' ' + res.data.symbol
    });
  };

renderTokenListFromEthereum = async () => {
  const res = (await axios.get(`/api/tasks/ethereum/${this.props.match.params.id}/1/10`))
  console.log('this is a list of Tokens', res)

};

renderDomainListFromEthereum = async () => {
  const res = (await axios.get(`/api/domains/ethereum/${this.props.match.params.id}/1/10`))
  console.log('this is a list of Domains', res)

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

            buttonText="View All Domains"
            api={`/api/colony/domain/${this.props.match.params.id}`}
            linkTo="/domains"


          />
          <StatCard
            title="Total # of Tasks"
            value={ this.state.totalTask }
            buttonText="View All Tasks"
            api="/api/colony/task/id"
            linkTo="/tasks"
          />
          <StatCard
            title="Reward Pot"
            value={ this.state.totalRewardPot }
            api="/api/colony/reward-pot/:id"
            linkTo="/domain"
          />
          <StatCard
            title="Non-Reward Pot"
            value={ this.state.totalNonRewardPot }
            api="/api/colony/domain/:id"
            linkTo="/domain"
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
