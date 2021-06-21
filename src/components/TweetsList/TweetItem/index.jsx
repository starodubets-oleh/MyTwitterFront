import React, { useState, useCallback, useMemo } from 'react';
import { useTweets } from '../../../providers/tweets';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import styles from './styles.module.scss';

const TweetItem = ({ tweet }) => {
  const { removeTweet, updateTweet } = useTweets();

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(tweet.content);

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = useCallback(
    async () => {
      updateTweet(value, tweet.id);
      setIsEdit(false);
    },
    [updateTweet, tweet, value],
  );

  const handleCancel = useCallback(
    () => {
      setIsEdit(false);
    },
    []
  )

  const handleRemove = useCallback(
    () => {
      removeTweet(tweet.id)
    },
    [removeTweet, tweet]
  )

  const tweetContent = isEdit ? (
    <FormControl fullWidth noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          id="standard-textarea"
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

  const tweetContent = useMemo(
    () => (
      isEdit ? (
        <FormControl fullWidth noValidate autoComplete="off">
          <div>
            <TextField
              fullWidth
              id="standard-textarea"
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
    [isEdit, tweet, value]
  );

  return (
    <Card className={styles.tweetItem}>
      <CardActionArea>
        <CardContent>
          {tweetContent}
        </CardContent>
      </CardActionArea>
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
    </Card>
  );
};

export default TweetItem;
