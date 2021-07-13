import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const UserItem = ({user}) => {
  const classes = useStyles();
  return (
    <Card 
      component={Link}
      to={`/user/${user.id}`}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={user.fullPath}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default UserItem;
