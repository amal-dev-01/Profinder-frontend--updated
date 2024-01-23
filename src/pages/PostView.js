import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../features/axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPost } from '../features/authSlice';
import { userPost } from '../features/authAction';
import { Container, Typography, Paper, CircularProgress, Box, Button, Grid, Card, Stack, Alert, Icon } from '@mui/material';
import { baseURL } from '../features/baseUrl';
import './PostView.css'
import { ThumbUp, ChatBubble } from '@mui/icons-material';



const PostView = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');
  const userPostData = useSelector(selectUserPost);
  const dispatch = useDispatch();

  console.log(userPostData);

  useEffect(() => {
    if (authToken) {
      dispatch(userPost(id));
    }
  }, [authToken, dispatch]);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  const handleCommentsClick = () => {
    setShowComments(!showComments);
    setShowLikes(false);
  };

  const handleLikesClick = () => {
    setShowLikes(!showLikes);
    setShowComments(false);
  };

  // const postDetails = async (postId) => {
  //   try {
  //     const response = await axiosInstance.get(`post/post/${postId}/update/`, {
  //       headers: {
  //         'Authorization': `Bearer ${authToken}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 200) {
  //       console.log('Data updated:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //   }
  // };
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setError] = useState('');



    const deletePost = async (postId) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this post?');
      if (!isConfirmed) {
        return;
      }
    
    try {
      const response = await axiosInstance.delete(`post/post/${postId}/update/`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      if (response.status === 204) {
        setSuccessMessage(response.status);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/userprofile');
        }, 3000);
      }

    } catch (error) {
      setError(error.response.data.error || 'An error occurred')
      console.error('Error updating post:', error);
    }
  };


  if (!userPostData) {
    return (
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="body1">Post not found</Typography>
        </Paper>
      </Container>
    );
  }


  return (
    <div>
    <Grid container spacing={2} style={{ padding: "5%" }}>
  
{(successMessage || errors) && (
  <Stack spacing={2} sx={{ width: '100%' }}>
    {successMessage === 204 ? (
      <Alert severity="success">Post successfully deleted</Alert>
    ) : (
      <Alert severity="error">{errors || 'Deletion failed. Please try again.'}</Alert>
    )}
  </Stack>
)}




      <Grid item xs={12} sm={7}>
        <div>
          <img src={`${baseURL}${userPostData.post}`} alt="Post" style={{ maxWidth: '100%' }} />

          <div style={{display:"flex" ,justifyContent:"left" ,padding:"10px"}}>

          <div style={{padding:"10px"}}>        
            <ThumbUp fontSize="small" /> : {userPostData.likes.length}</div>
          
          <div style={{padding:"10px"}}><ChatBubble fontSize="small" />: {userPostData.comments.length}</div>
          </div>

        </div>
  
        <Typography variant="h6">
          <strong> Title:</strong> {userPostData.title}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {userPostData.description}
        </Typography>
        <div style={{ padding: "25px", display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "2%" }}>
            <Button variant='outlined' onClick={()=>navigate(`/editpost/${userPostData.id}`)}>Edit Post</Button>
          </div>
          <div style={{ padding: "2%" }}>
            <Button variant='outlined' color='error' onClick={() => deletePost(userPostData.id)}>
              Delete Post
            </Button>
          </div>
        </div>
      </Grid>
  
      <Grid item xs={12} sm={4}>
        <Card style={{ height: "100%", padding: "5%" }}>
          <Button onClick={handleCommentsClick}>Comment</Button>
          <Button onClick={handleLikesClick}>Like</Button>
  
          {showComments && (
            <Box>
              {userPostData.comments && userPostData.comments.map((comment) => (
                <div className='comment-list' key={comment.id}>
                  <div>
                    <Typography style={{ padding: "2%", display: "flex", justifyContent: "flex-start", color: "grey" }}>
                      <strong>{comment.user.username}</strong>
                    </Typography>
                    <Card style={{ padding: "5%", marginTop: "10px" }}>
                      <Typography>
                        {comment.text}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.created_at).toLocaleString()}
                      </Typography>
                    </Card>
                  </div>
                </div>
              ))}
            </Box>
          )}
  
          {showLikes && (
            <Box>
              {userPostData.likes && userPostData.likes.map((like) => (
                <div key={like.id}>
                  <Typography variant="body1">
                    <strong>{like.user.username}</strong>
                  </Typography>
                  <Typography variant="caption">
                    {new Date(like.created_at).toLocaleString()}
                  </Typography>
                </div>
              ))}
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  </div>

  );
};

export default PostView;
