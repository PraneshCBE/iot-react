import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { MenuItem, Menu, Segment, Icon } from 'semantic-ui-react'


const MenuExampleInvertedSecondary = (props) => {
  const [activeItem, setActiveItem] = useState(props.name)
  const navigate = useNavigate();
  
  const user = props.user;
  console.log(user,props.name)
  const status = user === 'admin' ? false : true;
  const url = process.env.REACT_APP_EXPLORER_URL;

  const handleItemClick = (name) => {
    setActiveItem(name)
    if (name === 'Home') {
      navigate('/', { state: { tokens: props.tokens, user:user } });
    }
    if (name === 'History') {
      navigate('/history');
    }
    if (name === 'Register') {
      navigate('/reg', { state: { tokens: props.tokens, user:user } });
    }
  };
  return (
    <Segment inverted >
      <Menu inverted pointing secondary stackable icon fluid widths={10}>
        <MenuItem
          name='Home'
          active={activeItem === 'Home'}
          onClick={()=>handleItemClick('Home')}>
          <Icon name='home'></Icon>
          <span style={{ marginLeft: '10px' }}>Home</span>

        </MenuItem>
        <MenuItem
          name='Explorer'
          active={activeItem === 'Explorer'}
          onClick={()=>handleItemClick('Explorer')}
          href={url}
          target='_blank'
        >
          <Icon loading name='compass outline'></Icon>
          <span style={{ marginLeft: '10px' }}>Explorer</span>
        </MenuItem>
        <MenuItem
          name='History'
          active={activeItem === 'History'}
          onClick={()=>handleItemClick('History')}
        >
          <Icon name='history'></Icon>
          <span style={{ marginLeft: '10px' }}>History</span>
        </MenuItem>
        <MenuItem
          disabled={status}
          name='Register'
          active={activeItem === 'Register'}
          onClick={()=>handleItemClick('Register')}
          icon='profile'
        >
          <Icon name='user'></Icon>
          <span style={{ marginLeft: '10px' }}>Register</span>
        </MenuItem>
        <MenuItem
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={()=>handleItemClick('Profile')}
          icon='profile'
          position='right'
        >
          <Icon name='user'></Icon>
          <span style={{ marginLeft: '10px' }}>Profile</span>
        </MenuItem>
      </Menu>
    </Segment>
  );
}

export default MenuExampleInvertedSecondary;