import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Loader, Table, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import StatCard from './components/StatCard';

class Colony extends Component {
  state = {
    address: '',
    tokenName: '',
    tokenSymbol: '',
    finishedLoading: false,
    totalDomainCount: '',
    totalTaskCount: '',
    totalRewardPot: '',
    totalNonRewardPot: '',
    domains: [],
    tasks: [],
    domainsLoading: false,
    tasksLoading: false,
  };

  componentDidMount = () => {
    this.renderData();
  };

  renderData = () => {
    this.renderAddressFromEthereum();
    this.renderDomainFromEthereum();
    this.renderTasksFromEthereum();
    this.renderTokenInfo();
    this.renderTokenListFromEthereum();
    this.renderDomainListFromEthereum();
    this.renderDomains();
    this.renderTasks();
};

renderAddressFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/address/${this.props.match.params.id}`));
    this.setState({
      address: res.data.address
    });
  };

renderDomainFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/domain/${this.props.match.params.id}`));

    this.setState({
      totalDomainCount: res.data.totalDomainCount.count
    });
  };

renderTasksFromEthereum = async () => {
    const res = (await axios.get(`/api/colony/task/${this.props.match.params.id}`));
    this.setState({
      totalTaskCount: res.data.task
    });
  };

renderTokenInfo = async () => {
    const res = (await axios.get(`/api/token/colonyId/${this.props.match.params.id}`));
    this.setState({
      tokenName: res.data.name,
      tokenSymbol: res.data.symbol,
    });
  };

renderTokenListFromEthereum = async () => {
  this.setState({ tasksLoading: true });
  const res = (await axios.get(`/api/tasks/ethereum/${this.props.match.params.id}/1/10`))
  const { tasks } = res.data;
  this.setState({
    tasksLoading: false,
    tasks,
  });
};

renderDomainListFromEthereum = async () => {
  this.setState({ domainsLoading: true });
  const res = (await axios.get(`/api/domains/ethereum/${this.props.match.params.id}/1/10`))
  const { domains } = res.data;
  this.setState({
    domainsLoading: false,
    domains,
  });
};

renderDomains = () => {
    return this.state.domains.map(domain => {
      const { domainId, localSkillId, potId  } = domain;
      return (
        <Table.Row key={ Math.random() }>
          <Table.Cell>
            <NavLink className="item" to={`/domain/${this.props.match.params.id}/${domainId}`}>
              {domainId}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            {localSkillId}
          </Table.Cell>
          <Table.Cell>
            {potId}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

renderTasks = () => {
    return this.state.tasks.map(task => {
      const {
        id, domainId, skillId, potId, dueDate, specificationHash, deliverableDate, deliverableHash, payoutsWeCannotMake, finalized, cancelled
      } = task;

      return (
        <Table.Row key={ Math.random() }>
          <Table.Cell>
            <NavLink className="item" to={`/task/${this.props.match.params.id}/${id}`}>
             {JSON.stringify(id)}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink className="item" to={`/domain/${this.props.match.params.id}/${domainId}`}>
              {domainId}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(skillId)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(potId)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(dueDate)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(specificationHash)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(deliverableDate)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(deliverableHash)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(payoutsWeCannotMake)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(finalized)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(cancelled)}
          </Table.Cell>
        </Table.Row>
      );
    });
  };


  render() {
    return(
     <Container textAlign='center'>
      <h1>Colony {this.props.match.params.id}</h1>
      <h3>Address: {this.state.address}</h3>
      <h3>Token Name: {this.state.tokenName}</h3>
      <h3>Token Symbol: {this.state.tokenSymbol}</h3>

      <Grid columns={2} relaxed>
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
        </Grid>

      <Segment basic>
        <Loader active={this.state.domainsLoading} />
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Domain Id</Table.HeaderCell>
                <Table.HeaderCell>Local Skill Id</Table.HeaderCell>
                <Table.HeaderCell>Pot Id</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderDomains()}
            </Table.Body>
          </Table>
        </Segment>

      <Segment basic>
        <Loader active={this.state.tasksLoading} />
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Task Id</Table.HeaderCell>
                <Table.HeaderCell>Domain Id</Table.HeaderCell>
                <Table.HeaderCell>Skill Id</Table.HeaderCell>
                <Table.HeaderCell>Pot Id</Table.HeaderCell>
                <Table.HeaderCell>Due Date</Table.HeaderCell>
                <Table.HeaderCell>Specification Hash</Table.HeaderCell>
                <Table.HeaderCell>Deliverable Date</Table.HeaderCell>
                <Table.HeaderCell>Deliverable Hash</Table.HeaderCell>
                <Table.HeaderCell>Payouts We Cannot Make</Table.HeaderCell>
                <Table.HeaderCell>Finalized</Table.HeaderCell>
                <Table.HeaderCell>Cancelled</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderTasks()}
            </Table.Body>
          </Table>
        </Segment>

    </Container>
    )
  }
}

export default Colony;
