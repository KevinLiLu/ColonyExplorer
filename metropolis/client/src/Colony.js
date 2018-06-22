import React, { Component } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';

>>>>>>> 8c16ccfec937d6e862205e69c592f02cd4a98d37
>>>>>>> 16ceafc91b7055f59f8650c7c98c076b8103bae4
import StatCard from './StatCard';

class Colony extends Component {

<<<<<<< HEAD
  state = {
    address: '',
    tokens: '',
=======
<<<<<<< HEAD
  state = {
    address: '',
    tokens: '',
=======

  state = {
    address: '',
    token: '',
>>>>>>> 8c16ccfec937d6e862205e69c592f02cd4a98d37
>>>>>>> 16ceafc91b7055f59f8650c7c98c076b8103bae4
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16ceafc91b7055f59f8650c7c98c076b8103bae4

renderStatisticsFromEthereum = async () => {
    const data = (await axios.get('/api/statistics/ethereum')).data;
    this.setState({
      totalColonyCount: data.totalColonyCount,
      totalSkillCount: data.totalSkillCount,
    });
  };

<<<<<<< HEAD
=======
=======
  componentDidMount = () => {
    this.renderData();
  };


  renderData = () => {
    this.renderAddressFromEthereum();
    this.renderDomainFromEthereum();
    // this.renderTasksFromEthereum();
    // this.renderRewardPotFromEthereum();
    this.renderTokensFromEthereum();
  };


renderAddressFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/address/${this.props.match.params.id}`));
    this.setState({
      address: res.data.address
    });
  };

renderDomainFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/domain/${this.props.match.params.id}`));
    console.log()

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
    console.log(res)
    this.setState({
      token: res.data.name + ' ' + res.data.symbol
    });
  };
>>>>>>> 8c16ccfec937d6e862205e69c592f02cd4a98d37
>>>>>>> 16ceafc91b7055f59f8650c7c98c076b8103bae4

  render() {
    return(

     <Container textAlign='center'>

        <h1>Colony {this.props.match.params.id}</h1>
<<<<<<< HEAD
        <h2>Address: {}</h2>
        <h3>Token: {}</h3>
=======
<<<<<<< HEAD
        <h2>Address: {}</h2>
        <h3>Token: {}</h3>
=======
        <h2>Address: {this.state.address}</h2>
        <h3>Token: {this.state.token}</h3>
>>>>>>> 8c16ccfec937d6e862205e69c592f02cd4a98d37
>>>>>>> 16ceafc91b7055f59f8650c7c98c076b8103bae4


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
