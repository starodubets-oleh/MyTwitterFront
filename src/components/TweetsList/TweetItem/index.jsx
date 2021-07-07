import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { getLocalStorageUserId } from '../../../utils/localStorageHelpers';

import { deleteTweet, updateTweet } from '../../../redux/actions/tweetsAction'

import styles from './styles.module.scss';

const TweetItem = ({ tweet }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(tweet.content);

  const dispatch = useDispatch();

  const userId = getLocalStorageUserId();

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [],
  );

  const handleEdit = useCallback(
    () => {
      setIsEdit(true);
    },
    [],
  );

  const handleSave = useCallback(
    () => {
      dispatch(updateTweet(value, tweet.id));
    },
    [dispatch, value, tweet],
  );

  const handleCancel = useCallback(
    () => {
      setIsEdit(false);
    },
    []
  )

  const handleRemove = useCallback(
    () => {
      dispatch(deleteTweet(tweet.id))
    },
    [dispatch, tweet]
  )

  const tweetContent = useMemo(
    () => (
      isEdit ? (
        <FormControl fullWidth noValidate autoComplete="off">
          <div>
            <TextField
              fullWidth
              value={value}
              onChange={handleChange}
              placeholder="What's happening?"
              multiline
            />
          </div>
        </FormControl>
      ) : (
        <Typography variant="body1" color="textPrimary" component="p">
          {tweet.content}
        </Typography>
      )
    ),
    [isEdit, tweet, value, handleChange],
  );

  return (
    <Card elevation={3} className={styles.tweetItem}>
      <CardActionArea component={Link}  to={`/posts/${tweet?.id}/comments`} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tweet.user.name}
          </Typography>
          {tweetContent}
        </CardContent>
      </CardActionArea>
      {userId === tweet.user.id && (
        <CardActions>
          {
            isEdit ? (
              <>
                <Button
                  onClick={handleSave}
                  size="small"
                  color="primary"
                >
                  save
                </Button>
                <Button
                  onClick={handleCancel}
                  size="small"
                  color="primary"
                >
                  cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleEdit}
                  size="small"
                  color="primary"
                >
                  edit
                </Button>
                <Button
                  onClick={handleRemove}
                  size="small"
                  color="primary"
                >
                  remove
                </Button>
              </>
            )
          }
        </CardActions>
      )}
    </Card>
  );
};

export default TweetItem;
