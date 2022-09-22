import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CategoryCard from './CategoryCard';


export default function TemporaryDrawer() {

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <Divider />
      <List>
        {['STARTER', 'MAIN', 'BEVERAGE', 'DESSERT'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <CategoryCard/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment>
          <Drawer
            BackdropProps={{invisible: true}}
            anchor={'left'}
            open={true}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
