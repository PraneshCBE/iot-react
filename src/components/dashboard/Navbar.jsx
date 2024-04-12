import React, { Component } from 'react'
import { MenuItem, Menu, Segment, Icon } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const { activeItem } = this.state
    const url=process.env.REACT_APP_EXPLORER_URL;
    return (
      <Segment inverted>
        <Menu inverted pointing secondary stackable icon fluid widths={10}>
          <MenuItem 
            name='Home'
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          >
            <Icon name='home'></Icon>
            <span style={{ marginLeft: '10px' }}>Home</span>
            
          </MenuItem>  
          <MenuItem
            name='Explorer'
            active={activeItem === 'Explorer'}
            onClick={this.handleItemClick}
            href={url}
            target='_blank'
          >
          <Icon loading name='compass outline'></Icon>
            <span style={{ marginLeft: '10px' }}>Explorer</span>
          </MenuItem>
          <MenuItem
            name='History'
            active={activeItem === 'History'}
            onClick={this.handleItemClick}
          >
            <Icon name='history'></Icon>
            <span style={{ marginLeft: '10px' }}>History</span>
          </MenuItem>
          <MenuItem
            name='Register'
            active={activeItem === 'Register'}
            onClick={this.handleItemClick}
            icon='profile'
          >
            <Icon name='user'></Icon>
            <span style={{ marginLeft: '10px' }}>Register</span>
          </MenuItem>
          <MenuItem
            name='Profile'
            active={activeItem === 'Profile'}
            onClick={this.handleItemClick}
            icon='profile'
            position='right'
          >
            <Icon name='user'></Icon>
            <span style={{ marginLeft: '10px' }}>Profile</span>
          </MenuItem>
        </Menu>
      </Segment>
    )
  }
}