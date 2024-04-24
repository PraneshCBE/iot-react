import React from 'react'
import {
  Header,
  Image,
} from 'semantic-ui-react'

import url from '../../assets/Network.png'
const CardExampleCard = () => (
    <div>
        <Header as='h1' textAlign='center'>Network Topology</Header>
        <Image src={url} size='huge' centered rounded bordered/>
    </div>
  
)

export default CardExampleCard