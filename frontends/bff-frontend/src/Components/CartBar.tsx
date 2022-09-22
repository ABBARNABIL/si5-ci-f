import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';


export default function CartBar() {


  return (
    <div>
          <Drawer
            BackdropProps={{invisible: true}}
            anchor={'bottom'}
            open={true}
          >
            <ListItem  disablePadding>
            <ListItemText>Total : 50 $ | Items : 3</ListItemText>
            <ListItemButton>
            <ListItemText sx={{marginLeft:120}}>{"View my order >>"}</ListItemText>
              </ListItemButton>
          </ListItem>
          <Button variant="contained" color="success">
            Confirm order
        </Button>
            <Button variant="outlined" color="error">
            Cancel order
            </Button>
          </Drawer>
    </div>
  );
}
