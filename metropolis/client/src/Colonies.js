import React, { Component } from 'react';
import { Container, Table, Segment, Loader, Message, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Colonies extends Component {
  state = {
    pageId: 1,
    colonies: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
    loading: false,
    error: '',
    startId: '',
    endId: '',
    totalColonyCount: '',
  };

  componentDidMount = () => {
    this.renderData();
  };

  renderData = async () => {
    this.setState({ loading: true });
    const data = (await axios.get(`/api/colonies/${this.state.pageId}`));
    const totalColonyCount = ((await axios.get('/api/statistics/ethereum')).data).totalColonyCount;

    if (data.data.error) {
      this.setState({ error: data.data.error });
    } else {
      const { colonies, startId, endId } = data.data;
      this.setState({
        colonies,
        startId,
        endId,
        totalColonyCount,
      });
    }
    this.setState({ loading: false });
  };

  renderRows = () => {
    return this.state.colonies.map(colony => {
      const { id, address } = colony;
      return (
        <Table.Row key={id || Math.random()}>
          <Table.Cell>
            <NavLink className="item" to={`/colony/${id}`}>
              {id}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink className="item" to={`/colony/${id}`}>
              {address}
            </NavLink>
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

        <h1>Colonies</h1>

        <Segment basic>
          <Loader active={this.state.loading} />
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='1'>Colony ID</Table.HeaderCell>
                <Table.HeaderCell colSpan='5'>Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderRows()}
            </Table.Body>
          </Table>
        </Segment>

        <Container>
          <h5>Showing colonies {this.state.startId} to {this.state.endId} of {this.state.totalColonyCount}</h5>

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

          {this.state.endId !== this.state.totalColonyCount && (
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

export default Colonies;
