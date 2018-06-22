import React, { Component } from 'react';
import { Container, Header, Table, Segment, Loader, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Domain extends Component {
  state = {
    colonyId: '',
    domainId: '',
    fields: [],
  };

  componentDidMount = async () => {
    const { colonyId, domainId } = this.props.match.params;
    await this.setState({
      colonyId,
      domainId,
    });
    this.renderData();
  };

  renderData = async () => {
    this.setState({ loading: true });
    const data = (await axios.get(`/api/domain/${this.state.colonyId}/${this.state.domainId}`));

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
            { field[0] === 'colonyId' ?
              (
                <NavLink className="item" to={`/colony/${this.state.colonyId}`}>
                  {field[1]}
                </NavLink>
              ) : field[1]
            }
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

        <Header as='h1' dividing>Domain {this.state.domainId}</Header>

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

  export default Domain;
