import React, {useState, useCallback} from 'react';
import { useTweets } from '../../../providers/tweets';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import styles from './styles.module.scss';

const TweetItem = ({post}) => {
  const {removeTweet, updateTweet} = useTweets();

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(post.post);

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = useCallback(
    async () => {
      updateTweet(value, post.id);
      setIsEdit(false);
    },
    [updateTweet, post, value],
  );

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleRemove = useCallback(
  () => {
    removeTweet(post.id)
  },
  [removeTweet, post]
  )

  return (
    <Card className={styles.tweetItem}>
      <CardActionArea>
        <CardContent>
          {
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
            ):(
              <Typography variant="body1" color="textPrimary" component="p">
                {post.post}
              </Typography>

            )
          }
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
          ):(
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
