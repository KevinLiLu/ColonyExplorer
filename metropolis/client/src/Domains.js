import React, { Component } from 'react';
import { Container, Table, Segment, Loader, Message, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Domains extends Component {
  state = {
    pageId: 1,
    domains: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
    loading: false,
    error: '',
    startId: '',
    endId: '',
    totalDomainCount: '',
  };

  componentDidMount = () => {
    this.renderData();
  };

  renderData = async () => {
    this.setState({ loading: true });
    const data = (await axios.get(`/api/domains/${this.state.pageId}`));
    const { totalDomainCount } = (await axios.get('/api/network/count/domain')).data;

    if (data.data.error) {
      this.setState({ error: data.data.error });
    } else {
      const { domains, startId, endId } = data.data;
      this.setState({
        domains,
        startId,
        endId,
        totalDomainCount,
      });
    }
    this.setState({ loading: false });
  };

  renderRows = () => {
    return this.state.domains.map(domain => {
      const { colonyId, domainId, localSkillId, potId} = domain;
      return (
        <Table.Row key={Math.random()}>
          <Table.Cell>
            <NavLink className="item" to={`/colony/${colonyId}`}>
              {colonyId}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink className="item" to={`/domain/${colonyId}/${domainId}`}>
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

        <h1>Domains</h1>

        <Segment basic>
          <Loader active={this.state.loading} />
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Colony ID</Table.HeaderCell>
                <Table.HeaderCell>Domain ID</Table.HeaderCell>
                <Table.HeaderCell>Local Skill ID</Table.HeaderCell>
                <Table.HeaderCell>Pot Id</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderRows()}
            </Table.Body>
          </Table>
        </Segment>

        <Container>
          <h5>Showing tasks {this.state.startId} to {this.state.endId} of {this.state.totalDomainCount}</h5>

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

          {this.state.endId !== this.state.totalDomainCount && (
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

export default Domains;
