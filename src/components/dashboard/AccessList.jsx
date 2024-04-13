import React from 'react'
import { List, ListItem, Icon, ListContent, ListHeader } from 'semantic-ui-react'

const AccessList = ({ access }) => {
  return (
    <List animated verticalAlign='middle'>
      {access.map((item, index) => (
        <ListItem key={index}>
          <Icon name='certificate'></Icon>
          <ListContent>
            <ListHeader>{item}</ListHeader>
          </ListContent>
        </ListItem>
      ))}
    </List>
  );
}

export default AccessList;
