import React from 'react'
import { Grid, Segment } from 'semantic-ui-react';
import { Statistic } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export default props => {
  return (
    <Grid.Column>
      <Segment basic>
        <h3>{props.title}</h3>
      </Segment>
      <Segment basic>
        <Statistic>
          <Statistic.Value>{props.value}</Statistic.Value>
        </Statistic>
      </Segment>
      <Segment basic>
        <Button>
          {props.buttonText}
        </Button>
      </Segment>
    </Grid.Column>
  );
};
