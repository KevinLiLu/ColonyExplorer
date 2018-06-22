import React, { Component } from 'react';
import { Container, Table, Segment, Loader, Message, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Tasks extends Component {
  state = {
    pageId: 1,
    tasks: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
    loading: false,
    error: '',
    startId: '',
    endId: '',
    totalTaskCount: '',
  };

  componentDidMount = () => {
    this.renderData();
  };

  renderData = async () => {
    this.setState({ loading: true });
    const data = (await axios.get(`/api/tasks/${this.state.pageId}`));
    const { totalTaskCount } = (await axios.get('/api/network/count/task')).data;

    if (data.data.error) {
      this.setState({ error: data.data.error });
    } else {
      const { tasks, startId, endId } = data.data;
      this.setState({
        tasks,
        startId,
        endId,
        totalTaskCount,
      });
    }
    this.setState({ loading: false });
  };

  renderRows = () => {
    return this.state.tasks.map(task => {
      const { colonyId, domainId, id, cancelled, deliverableDate,
        deliverableHash, dueDate, finalized, payoutsWeCannotMake, potId,
        skillId, specificationHash
      } = task;
      return (
        <Table.Row key={Math.random()}>
          <Table.Cell>
            <NavLink className="item" to={`/colony/${colonyId}`}>
              {colonyId}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink className="item" to={`/domain/${domainId}`}>
              {domainId}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink className="item" to={`/task/${colonyId}/${domainId}/${id}`}>
              {id}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(cancelled)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(deliverableDate)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(deliverableHash)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(dueDate)}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(finalized)}
          </Table.Cell>
          <Table.Cell>
            {payoutsWeCannotMake}
          </Table.Cell>
          <Table.Cell>
            {potId}
          </Table.Cell>
          <Table.Cell>
            {skillId}
          </Table.Cell>
          <Table.Cell>
            {specificationHash}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  prevClicked = async () => {
    await this.setState({
      pageId: this.state.pageId - 1,
    });
    this.renderData();
  };

  nextClicked = async (event) => {
    event.preventDefault();
    await this.setState({
      pageId: this.state.pageId + 1,
    });
    this.renderData();
  };

  render = () => {
    return (
      <Container textAlign='center'>
        {/* Error Message */}
        <Message negative visible={!!this.state.error} hidden={!this.state.error}>
          <Message.Header>{this.state.error}</Message.Header>
        </Message>

        <h1>Tasks</h1>

        <Segment basic>
          <Loader active={this.state.loading} />
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Colony ID</Table.HeaderCell>
                <Table.HeaderCell>Domain ID</Table.HeaderCell>
                <Table.HeaderCell>Task ID</Table.HeaderCell>
                <Table.HeaderCell>Cancelled</Table.HeaderCell>
                <Table.HeaderCell>Deliverable Date</Table.HeaderCell>
                <Table.HeaderCell>Deliverable Hash</Table.HeaderCell>
                <Table.HeaderCell>Due Date</Table.HeaderCell>
                <Table.HeaderCell>Finalized</Table.HeaderCell>
                <Table.HeaderCell>Payouts We Cannot Make</Table.HeaderCell>
                <Table.HeaderCell>Pot ID</Table.HeaderCell>
                <Table.HeaderCell>Skill ID</Table.HeaderCell>
                <Table.HeaderCell>Specification Hash</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderRows()}
            </Table.Body>
          </Table>
        </Segment>

        <Container>
          <h5>Showing tasks {this.state.startId} to {this.state.endId} of {this.state.totalTaskCount}</h5>

          {this.state.pageId !== 1 && (
            <Button
              primary
              icon
              labelPosition='left'
              onClick={this.prevClicked}
              loading={this.state.loading}
            >
              Prev
              <Icon name='left arrow' />
            </Button>
          )}

          {this.state.endId !== this.state.totalTaskCount && (
            <Button
              primary
              icon
              labelPosition='right'
              onClick={this.nextClicked}
              loading={this.state.loading}
            >
              Next
              <Icon name='right arrow' />
            </Button>
          )}
        </Container>
      </Container>
    );
  };
};

export default Tasks;
