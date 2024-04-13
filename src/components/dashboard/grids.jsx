import React from 'react'
import { Link } from 'react-router-dom'
import { GridRow, GridColumn, Grid, Segment, HeaderSubheader, HeaderContent, Header, Icon} from 'semantic-ui-react'

const Grids = () => (
  <Grid relaxed centered columns={4} divided="vertically" stackable verticalAlign='middle' padded>
    <GridRow stretched>
      <GridColumn>
        <Segment piled size='massive' placeholder as={Link}>
                    <center>
                    <Header as='h2'>
                    <   Icon name='home' />
                        <HeaderContent>
                        Home Appliances
                        <HeaderSubheader>Channel 1</HeaderSubheader>
                        </HeaderContent>
                    </Header>
                    </center>
            </Segment>
      </GridColumn>
      <GridColumn>
      <Segment piled size='massive' placeholder as={Link}>
                    <center>
                    <Header as='h2'>
                    <   Icon name='info' />
                        <HeaderContent>
                        Intelli Devices
                        <HeaderSubheader>Channel 1</HeaderSubheader>
                        </HeaderContent>
                    </Header>
                    </center>
            </Segment>      </GridColumn>
      <GridColumn>
      <Segment piled size='massive' placeholder as={Link}>
                    <center>
                    <Header as='h2'>
                    <   Icon name='video' />
                        <HeaderContent>
                        Surveillance
                        <HeaderSubheader>Channel 2</HeaderSubheader>
                        </HeaderContent>
                    </Header>
                    </center>
            </Segment>      </GridColumn>
    </GridRow>
  </Grid>
)

export default Grids