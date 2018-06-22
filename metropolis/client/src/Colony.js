import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Table, Segment } from 'semantic-ui-react';


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
    topDomains: [],
    topTasks: []
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
    this.renderTasksFromEthereum();
    // this.renderRewardPotFromEthereum();
    this.renderTokensFromEthereum();
    this.renderTokenListFromEthereum();
    this.renderDomainListFromEthereum();
    this.renderRows();
    this.rendertheRows();
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

renderTasksFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/task/${this.props.match.params.id}`));
    console.log('why you no work', this.props.match.params.id)
    console.log('this is the task', res.data.task)
    this.setState({
      totalTaskCount: res.data.task
    });
    console.log('state of totalTaskCount', this.state.totalTaskCount)
  };

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

  let array1 = res.data.tasks

  this.setState({
    topTasks: array1
  })

};

renderDomainListFromEthereum = async () => {
  const res = (await axios.get(`/api/domains/ethereum/${this.props.match.params.id}/1/10`))
  console.log('this is a list of Domains', res)

  let array = res.data.domains
  console.log('this is the array', array)
  this.setState({
    topDomains: array
  })
};

renderRows = () => {
    return this.state.topDomains.map(topDomain => {
      const { localSkillId, potId  } = topDomain;
      return (
        <Table.Row key={ Math.random() }>
          <Table.Cell>
             {localSkillId} , {potId}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

rendertheRows = () => {
    return this.state.topTasks.map(topTask => {
      const { specificationHash, deliverableHash, finalized, cancelled, dueDate } = topTask;
      return (
        <Table.Row key={ Math.random() }>
          <Table.Cell>
             {JSON.stringify(specificationHash)} , {JSON.stringify(deliverableHash)}, {JSON.stringify(finalized)}, {JSON.stringify(cancelled)}, {JSON.stringify(dueDate)}
          </Table.Cell>
        </Table.Row>
      );
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

            buttonText="View All Domains"
            api={`/api/colony/domain/${this.props.match.params.id}`}
            linkTo="/domains"


          />
          <StatCard
            title="Total # of Tasks"
            buttonText="View All Tasks"
            api={`/api/colony/task/${this.props.match.params.id}`}
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

      <Segment basic>
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Top 5 Domains ( Skill ID, Pot  ID)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderRows()}
            </Table.Body>
          </Table>
        </Segment>


      <Segment basic>
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Top 5 Tasks ( specificationHash, deliverableHash, finalized, cancelled, dueDate )</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.rendertheRows()}
            </Table.Body>
          </Table>
        </Segment>


    </Container>

    )
  }
}

export default Colony;
