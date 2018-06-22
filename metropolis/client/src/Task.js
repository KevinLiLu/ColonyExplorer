import React, { Component } from 'react';
import { Container, Header, Table, Segment, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';

class Task extends Component {
  state = {
    colonyId: '',
    taskId: '',
    fields: [],
  };

  componentDidMount = async () => {
    const { colonyId, taskId } = this.props.match.params;
    await this.setState({
      colonyId,
      taskId,
    });
    this.renderData();
  };

  renderData = async () => {
    this.setState({ loading: true });
    const data = (await axios.get(`/api/task/${this.state.colonyId}/${this.state.taskId}`));

    if (data.data.error) {
      this.setState({ error: data.data.error });
    } else {
      const { fields } = data.data;
      this.setState({
        fields,
      });
    }
    this.setState({ loading: false });
  };

  renderRows = () => {
    return this.state.fields.map(field => {
      return (
        <Table.Row key={Math.random()}>
          <Table.Cell>
              {field[0]}
          </Table.Cell>
          <Table.Cell>
              {JSON.stringify(field[1])}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  render = () => {
    return(
      <Container textAlign='center'>
        {/* Error Message */}
        <Message negative visible={!!this.state.error} hidden={!this.state.error}>
          <Message.Header>{this.state.error}</Message.Header>
        </Message>

        <Header as='h1' dividing>Task {this.state.taskId}</Header>

        <Segment basic>
          <Loader active={this.state.loading} />
          <Table celled striped color='teal'>
            <Table.Body>
              {this.renderRows()}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    )
  }
}

  export default Task;
