import React, { Component } from 'react';
import { Container, Grid, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';

var LineChart = require("react-chartjs").Line;

class StatGraph extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.renderGraph();
  };

  renderGraph = async () => {
    this.setState({ loading: true });
    let response = await axios.get(`/api/time-series-data/${this.props.name}`);
    const { labels, data } = response.data;

    let datasets = [
  		{
  			label: "Total Colony Count",
  			fillColor: "rgba(220,220,220,0.2)",
  			strokeColor: "rgba(220,220,220,1)",
  			pointColor: "rgba(220,220,220,1)",
  			pointStrokeColor: "#fff",
  			pointHighlightFill: "#fff",
  			pointHighlightStroke: "rgba(220,220,220,1)",
  			data,
  		}
  	];

    const graphData = {
      labels,
      datasets,
    };

    const options = {

    };

    this.setState({
      loading: false,
      graph:
        <Container>
          <Segment basic>
            <h3>{this.props.title}</h3>
          </Segment>
          <Segment basic>
            <LineChart data={graphData} options={options} width="500" height="250"/>
          </Segment>
        </Container>
    });
  };

  render = () => {
    return (
      <Grid.Column>
        <Loader active={this.state.loading} />
        {this.state.graph}
      </Grid.Column>
    );
  };
}

export default StatGraph;
