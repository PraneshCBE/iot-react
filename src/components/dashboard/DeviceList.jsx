import React from 'react';
import { Card, CardGroup, CardHeader } from 'semantic-ui-react';

const DeviceList = ({ devices }) => {
  return (
    <div style={{marginLeft:"100px",marginRight:"100px"}}>
        <CardGroup  itemsPerRow={3} stackable>
        {
            devices.map((item,index)=>(
                <Card key={index}>
                    <CardHeader>{item}</CardHeader>
                </Card>
            ))
        }
    
        </CardGroup>
    </div>
    
  );
};

export default DeviceList;
