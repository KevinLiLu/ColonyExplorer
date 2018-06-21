import React, { Component } from 'react';
import { Container, Table, Segment, Loader, Message, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Skills extends Component {
  state = {
    pageId: 1,
    skills: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
    loading: false,
    error: '',
    startId: '',
    endId: '',
    totalSkillCount: '',
  };

  componentDidMount = () => {
    this.renderData();
  };

  renderData = async () => {
    this.setState({ loading: true });
    const data = (await axios.get(`/api/skills/${this.state.pageId}`));
    const { totalSkillCount } = (await axios.get('/api/network/count/skill')).data;

    if (data.data.error) {
      this.setState({ error: data.data.error });
    } else {
      const { skills, startId, endId } = data.data;
      this.setState({
        skills,
        startId,
        endId,
        totalSkillCount,
      });
    }
    this.setState({ loading: false });
  };

  renderRows = () => {
    return this.state.skills.map(skill => {
      const { skillId, nParents, nChildren } = skill;
      return (
        <Table.Row key={skillId || Math.random()}>
          <Table.Cell>
            <NavLink className="item" to={`/skill/${skillId}`}>
              {skillId}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            {nParents}
          </Table.Cell>
          <Table.Cell>
              {nChildren}
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

        <h1>Skills</h1>

        <Segment basic>
          <Loader active={this.state.loading} />
          <Table celled striped color='teal'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Skill ID</Table.HeaderCell>
                <Table.HeaderCell>nParents</Table.HeaderCell>
                <Table.HeaderCell>nChildren</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderRows()}
            </Table.Body>
          </Table>
        </Segment>

        <Container>
          <h5>Showing skills {this.state.startId} to {this.state.endId} of {this.state.totalSkillCount}</h5>

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

export default Skills;
