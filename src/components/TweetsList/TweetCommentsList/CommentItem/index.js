import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { getLocalStorageUserId } from '../../../../utils/localStorageHelpers';

import { deleteComment, updateComment } from '../../../../redux/actions/tweetsAction'

import styles from './styles.module.scss';

const CommentItem = ({ data }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(data.content);

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
      dispatch(updateComment(value, data.id));
    },
    [dispatch, value, data],
  );

  const handleCancel = useCallback(
    () => {
      setIsEdit(false);
    },
    []
  )

  const handleRemove = useCallback(
    () => {
      dispatch(deleteComment(data.id))
    },
    [dispatch, data]
  )

  const commentContent = useMemo(
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
          {data.content}
        </Typography>
      )
    ),
    [isEdit, data, value, handleChange],
  );

  return (
    <Card elevation={3} className={styles.commentItem}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.user.name}
          </Typography>
          {commentContent}
        </CardContent>
      </CardActionArea>
      {userId === data.user.id && (
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

export default CommentItem;
