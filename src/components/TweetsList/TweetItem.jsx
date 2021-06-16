import React, {useState} from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const TweetItem = ({post}) => {

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(post.post);

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    axios.patch(`/posts/${post.id}`, {updatedPost: value})
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => setIsEdit(false))
  }
  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleRemove = () => {
    axios.delete(`/posts/${post.id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  return (
    <Card className='tweet-item'>
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
          <React.Fragment>
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
          </React.Fragment>
          ):(
            <React.Fragment>
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
            </React.Fragment>
          )
        }
      </CardActions>
    </Card>
  );
};

export default TweetItem;



























// import React from 'react';

// const TweetItem = ({post: {post}, idx}) => {
//   return (
//     <div className='tweet-item'>
//       <div className="post-box">
//         <div className="ordinals">
//           {idx + 1}
//         </div>
//         <div className="post">
//           {post}
//         </div>
//       </div>
//       <div className="group-btn">
//         <div className="delete-btn">
//           <button>del</button>
//         </div>
//         <div className="edit-btn">
//           <button>edit</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TweetItem;