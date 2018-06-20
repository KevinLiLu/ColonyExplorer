import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

var LineChart = require("react-chartjs").Line;

export default props => {
  let data = {
  	labels: props.labels,
  	datasets: [
  		{
  			label: "Total Colony Count",
  			fillColor: "rgba(220,220,220,0.2)",
  			strokeColor: "rgba(220,220,220,1)",
  			pointColor: "rgba(220,220,220,1)",
  			pointStrokeColor: "#fff",
  			pointHighlightFill: "#fff",
  			pointHighlightStroke: "rgba(220,220,220,1)",
  			data: props.data
  		}
  	]
  };

  let options = {

  };

  return (
    <Grid.Column>
      <Segment basic>
        <h3>{props.title}</h3>
      </Segment>
      <Segment basic>
        <LineChart data={data} options={options} width="600" height="250"/>
      </Segment>
    </Grid.Column>
  );
};
