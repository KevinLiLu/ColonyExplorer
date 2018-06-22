import React, { Component } from 'react';
import { Button, Container, Form, Grid, Header, Icon, Message } from 'semantic-ui-react';
import web3 from './ethereum/web3';
import getColonyNetworkContract from './ethereum/iColonyNetworkContract';
import getTokenContract from './ethereum/tokenContract';
import ConfigurableMessage from './components/ConfigurableMessage';
import getColonyContract from './ethereum/iColonyContract';

class Manage extends Component {
  state = {
    tokenName: '',
    tokenSymbol: '',
    tokenDecimals: 18,
    tokenAddress: '', // output
    inputTokenAddress: '',
    colonyId: '',   // output
    colonyAddress: '', // output
    loading: false,
    errorMessage: '',
    messageTokenName: '',
    messageTokenSymbol: '',
    inputSpecificationHash: '',
    inputDomainId: '',
    inputColonyId: '',
    taskId: '',    // output
  };

  prepareSubmit = () => {
    this.setState({
      errorMessage: '',
      loading: true,
      tokenAddress: '',
      colonyAddress: '',
      colonyId: '',
      taskId: '',
    });
  };

  onSubmitCreateToken = async (event) => {
    try {
      event.preventDefault();

      // Reset all state
      this.prepareSubmit();

      // Token details
      const args = [
        web3.utils.fromAscii(this.state.tokenName),
        web3.utils.fromAscii(this.state.tokenSymbol),
        parseInt(this.state.tokenDecimals, 10),
      ];

      // Deploy token contract with specified arguments
      const accounts = await web3.eth.getAccounts();
      const { tokenContract, bytecode } = await getTokenContract();
      const deployedToken = await tokenContract.deploy({
        data: bytecode,
        arguments: args,
      })
      .send({
        from: accounts[0],
      });

      this.setState({
        tokenAddress: deployedToken.options.address,
        messageTokenName: this.state.tokenName,
        messageTokenSymbol: this.state.tokenSymbol,
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  onSubmitCreateColony = async (event) => {
    try {
      event.preventDefault();

      // Reset all state
      this.prepareSubmit();

      // Send transaction to create colony
      const colonyNetworkContract = await getColonyNetworkContract();
      const accounts = await web3.eth.getAccounts();
      const result = await colonyNetworkContract.methods.createColony(this.state.inputTokenAddress).send({ from: accounts[0] });

      // Extract return values colonyId and colonyAddress from transaction
      const { colonyId, colonyAddress } = result.events.ColonyAdded.returnValues;

      this.setState({
        colonyId,
        colonyAddress,
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  onSubmitCreateTask = async (event) => {
    try {
      event.preventDefault();

      // Reset all state
      this.prepareSubmit();

      const accounts = await web3.eth.getAccounts();
      const colonyNetworkContract = await getColonyNetworkContract();
      const colonyAddress = await colonyNetworkContract.methods.getColony(this.state.inputColonyId).call();
      const colonyContract = await getColonyContract(colonyAddress);
      const result = await colonyContract.methods.makeTask(web3.utils.fromAscii(this.state.inputSpecificationHash), this.state.inputDomainId)
        .send({ from: accounts[0] });

      // Extract return value taskId from transaction
      const taskId = result.events.TaskAdded.returnValues.id;

      this.setState({
        taskId,
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  render = () => {
    return (
      <Container style={{marginTop: 25}}>

        <ConfigurableMessage
          hidden={!!web3}
          iconName='warning circle'
          header='Could not detect web3'
          body='You must be signed into MetaMask to interact with the Colony Network! https://metamask.io/'
          negative={true}
          success={false}
        />

        <Message icon hidden={!this.state.loading}>
          <Icon name='circle notched' loading/>
          <Message.Content>
            <Message.Header>Sending Transaction...</Message.Header>
            Please wait a moment while the transaction is sent to the ethereum network.
          </Message.Content>
        </Message>

        <ConfigurableMessage
          hidden={!this.state.errorMessage}
          iconName='warning circle'
          header='Error!'
          body={this.state.errorMessage}
          negative={true}
          success={false}
        />

        <ConfigurableMessage
          hidden={!this.state.tokenAddress}
          iconName='thumbs up outline'
          header='Token creation successful!'
          body={`Token ${this.state.messageTokenName} ${this.state.messageTokenSymbol} deployed at ${this.state.tokenAddress}.`}
          negative={false}
          success={true}
        />

        <ConfigurableMessage
          hidden={!this.state.colonyAddress}
          iconName='thumbs up outline'
          header='Colony creation successful!'
          body={`Colony ${this.state.colonyId} created at ${this.state.colonyAddress}`}
          negative={false}
          success={true}
        />

        <ConfigurableMessage
          hidden={!this.state.taskId}
          iconName='thumbs up outline'
          header='Task creation successful!'
          body={`Task ${this.state.taskId} created!`}
          negative={false}
          success={true}
        />

        <Grid>
          <Grid.Row>

            <Grid.Column width={8}>
              <Header as='h2' dividing>Create a Token!</Header>
              <Form onSubmit={this.onSubmitCreateToken}>
                <Form.Input required fluid disabled={!web3}
                  label='Token Name'
                  placeholder='Cool Token'
                  value={this.state.tokenName}
                  onChange={event => this.setState({ tokenName: event.target.value })}
                />
                <Form.Input required fluid disabled={!web3}
                  label='Token Symbol'
                  placeholder='COOL'
                  value={this.state.tokenSymbol}
                  onChange={event => this.setState({ tokenSymbol: event.target.value })}
                />
                <Form.Input fluid disabled={!web3}
                  label='Token Decimals'
                  placeholder={18}
                  value={this.state.tokenDecimals}
                  onChange={event => this.setState({ tokenDecimals: event.target.value })}
                />
                <Button
                  primary
                  disabled={!web3}
                  type='submit'
                  loading={this.state.loading}
                >
                  Create Token!
                </Button>
              </Form>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header as='h2' dividing>Create a Colony!</Header>
              <Form onSubmit={this.onSubmitCreateColony}>
                <Form.Input required fluid disabled={!web3}
                  label='Token Address'
                  placeholder='0x0'
                  value={this.state.inputTokenAddress}
                  onChange={event => this.setState({ inputTokenAddress: event.target.value })}
                />
                <Button
                  primary
                  disabled={!web3}
                  type='submit'
                  loading={this.state.loading}
                >
                  Create Colony!
                </Button>
              </Form>
            </Grid.Column>

          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h2' dividing>Create a Task!</Header>
              <Form onSubmit={this.onSubmitCreateTask}>
                <Form.Input required fluid disabled={!web3}
                  label='Colony Id'
                  placeholder='1'
                  value={this.state.inputColonyId}
                  onChange={event => this.setState({ inputColonyId: event.target.value })}
                />
                <Form.Input required fluid disabled={!web3}
                  label='Domain Id'
                  placeholder='1'
                  value={this.state.inputDomainId}
                  onChange={event => this.setState({ inputDomainId: event.target.value })}
                />
                <Form.Input required fluid disabled={!web3}
                  label='Specification Hash'
                  placeholder='123xyz'
                  value={this.state.inputSpecificationHash}
                  onChange={event => this.setState({ inputSpecificationHash: event.target.value })}
                />
                <Button
                  primary
                  disabled={!web3}
                  type='submit'
                  loading={this.state.loading}
                >
                  Create Task!
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };
};

export default Manage;
