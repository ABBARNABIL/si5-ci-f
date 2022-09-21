import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { maxHeight } from '@mui/system';

export default function CategoryCard() {
  return (
    <Card sx={{ maxWidth: 160 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100"
        image="https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          MAIN
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
