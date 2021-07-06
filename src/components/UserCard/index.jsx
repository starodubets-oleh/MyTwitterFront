import React, {useState, useCallback} from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getLocalStorageUserAvatar, getLocalStorageUserName, getLocalStorageUserEmail } from '../../utils/localStorageHelpers';

import EditUser from './EditUser';

import styles from './styles.module.scss'

const UserCard = () => {

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = useCallback(
    () => {
      setOpenModal(false)
    }, 
    []
  );
  const handleOpenModal = useCallback(
    () => {
      setOpenModal(true)
    }, 
    []
  );

  return (
    <>
    <div className={styles.userCard}>
    <Card className={styles.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={getLocalStorageUserAvatar()}
          title="Contemplative Reptile"
          height='300'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Name: {getLocalStorageUserName()}
          </Typography>
          <Typography component="p">
            Email: {getLocalStorageUserEmail()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleOpenModal}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
    </div>
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={styles.modal}
      >
        <div className={styles.modalBody}>
          <EditUser/>
        </div>
      </Modal>
    </>
  );
}

export default UserCard;
