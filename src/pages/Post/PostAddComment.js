import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import axiosInstance from '../../features/axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ postId }) => {
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const authToken = localStorage.getItem('authtoken');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCommentText('');
    setError('');
    setOpen(false);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const postComment = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        `post/post/${postId}/comment/`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Comment posted successfully");
        handleClose();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {postId}
          </Typography>
          <form onSubmit={postComment}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              name="text"
              value={commentText}
              onChange={handleCommentChange}
              label="Comment"
            />
            <Button type="submit">Submit</Button>
          </form>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
