import * as React from 'react';
import List from '@mui/material/List';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import CategoryElement from './CategoryElement';

export default function GutterlessList() {

  const [category, setCategory] = React.useState([]);

  React.useEffect(() => {
    //use axios to get the categories
    axios.get('http://localhost:3000/menus')
      .then(res => {
        setCategory(res.data);
      }
      )
      .catch(err => {
        console.log(err);
      }
      )
  }, []);


  return (
    <List sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
      {category.map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
          <CategoryElement name="Pizza" image="https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg"/>
        </ListItem>
      ))}
    </List>
  );
}
