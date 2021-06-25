import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NewCommentForm from './NewCommentForm';

import CommentItem from './CommentItem';

import styles from './styles.module.scss'

const TweetCommentsList = ({postId, comments}) => {

  return (
    <div >
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography >Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.commentContent}>
            <NewCommentForm
              postId={postId}
            />
            {
              comments.map(item => (
                <CommentItem
                  key={item.id}
                  data={item}
                />
              ))
            }
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


export default TweetCommentsList;