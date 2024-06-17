import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PeopleIcon from '@mui/icons-material/People';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { styled, keyframes, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;


const StyledButton = styled(Button)(({ theme }) => ({
    
  '&:hover': {
    colors: theme.palette.secondary.light,
  },
  animation: `${bounce} 2s infinite`,
}));


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <Box component="section" sx={{ fontSize: 30}}>
        Beechems
      </Box>
      </List>
      <Divider />
      <List>
        {[{text:'Home', icon: <OtherHousesIcon/>, path:'/'}, 
        {text: 'Manage Employees', icon: <PeopleIcon/>, path: '/employees'}, 
        {text: 'Attendance Log', icon: <PeopleIcon/>, path: '/attendance'}].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
    
      <StyledButton onClick={toggleDrawer(true)}>
            <ClearAllIcon style={{color:'white'}} fontSize='large'/>
      </StyledButton>
      

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}