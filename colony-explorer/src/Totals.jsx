import React, { Component } from 'react'
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Statistic } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

class DividerVertical extends Component {
  render() {
    return (
  <Grid columns={4} relaxed>
    <Grid.Column>
      <Segment basic>Total # of Colonies</Segment>
      <Statistic label='Colonies' value='5,550' />
      <Button >
      View All Colonies
      </Button>
    </Grid.Column>
    <Divider vertical>Or</Divider>
    <Grid.Column>
      <Segment basic>Total # of Tasks</Segment>
      <Statistic label='Tasks' value='5,550' />
      <Button >
      View All Tasks
      </Button>
    </Grid.Column>
    <Divider vertical>Or</Divider>
    <Grid.Column>
      <Segment basic>Total # of Domains</Segment>
      <Statistic label='Domains' value='5,550' />
      <Button >
      View All Domains
      </Button>
      </Grid.Column>
    <Divider vertical>And</Divider>
    <Grid.Column>
      <Segment basic>Total # of Skills</Segment>
      <Statistic label='Skills' value='5,550' />
      <Button >
      View All Skills
      </Button>
    </Grid.Column>
  </Grid>

  )
 }
}
export default DividerVertical;
