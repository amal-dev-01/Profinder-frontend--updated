import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../features/axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPost } from '../../features/authSlice';
import { userPost } from '../../features/authAction';
import { Container, Typography, Paper, Box, Grid, Stack, Alert, IconButton, useTheme,List,ListItem,ListItemAvatar,ListItemText } from '@mui/material';
import { baseURL } from '../../features/baseUrl';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';


const PostView = () => {
  
  const navigate = useNavigate()
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');
  const userPostData = useSelector(selectUserPost);
  const dispatch = useDispatch();
  const theme = useTheme();

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
    <div style={{ display: "flex" }}>
      <Grid container spacing={1} style={{ justifyContent: "center", alignContent: "center", padding: "2%" }} >

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

            <div style={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ padding: "10px" }}>
                  <IconButton>

                    <FavoriteOutlinedIcon onClick={handleLikesClick} sx={{ color: red[500] }} />
                  </IconButton> {userPostData.likes.length}
                </div>
                <div style={{ padding: "10px" }}>
                  <IconButton>

                    <CommentIcon onClick={handleCommentsClick} />
                  </IconButton>
                  {userPostData.comments.length}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ padding: "10px" }}>
                  <IconButton>
                    <EditOutlinedIcon onClick={() => navigate(`/editpost/${userPostData.id}`)} />
                  </IconButton>
                </div>
                <div style={{ padding: "10px" }}>
                  <IconButton>
                    <DeleteOutlineOutlinedIcon onClick={() => deletePost(userPostData.id)} color='red' />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          <CardContent>
            <Typography variant="h6" component="div">
              {userPostData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userPostData.description}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} sm={6}>
          
          <div style={{ height: "100%", padding: "5%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* {showComments && (
              <Box>
                {userPostData.comments && userPostData.comments.map((comment) => (
                  <div className='comment-list' key={comment.id}>
                    <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{comment.user.username[0].toUpperCase()}</Avatar>

                      <Typography variant="h6" >
                        {comment.user.username}
                      </Typography>z
                      <Typography variant="body2" >
                        {comment.text}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" >
                        {new Date(comment.created_at).toLocaleString()}
                      </Typography>
                      <div>
                      </div>
                    </Box>
                  </div>
                ))}
              </Box>
            )} */}
             {showComments && (
          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <List>
              {userPostData.comments &&
                userPostData.comments.slice().reverse().map((comment) => (
                  <ListItem key={comment.id} alignItems="flex-start" sx={{ marginTop: 2,  textAlign: "left",marginLeft:"25px",backgroundColor:"#f8f7f4",borderRadius:"25px" ,padding:"10px",width: "90%"}}>
                    <ListItemAvatar>
                      <Avatar alt={comment.user.username} src={comment.user.xas} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body1" color="textPrimary">
                            <b>{comment.user.username}</b>
                          </Typography>
                          {` - ${comment.text}`}
                          {/* {renderDeleteButton(comment)} */}
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textSecondary">
                            {new Date(comment.created_at).toLocaleString()}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        )}

            {/* {showLikes && (
              <Box>
                {userPostData.likes && userPostData.likes.map((like) => (
                  <div key={like.id}>
                    <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{like.user.username[0].toUpperCase()}</Avatar>

                      <Typography variant="h6" >
                        {like.user.username}
                      </Typography>

                      <Typography variant="caption">
                        {new Date(like.created_at).toLocaleString()}
                      </Typography>
                      <div>
                      </div>
                    </Box>

                  </div>
                ))}
              </Box>
            )} */}
            {showLikes && (
  <Box sx={{ width: '100%', maxWidth: '600px' }}>
    {userPostData.likes &&
      userPostData.likes.map((like) => (
        <ListItem key={like.id} alignItems="flex-start" sx={{ marginTop: 2, textAlign: "left", marginLeft: "25px", backgroundColor: "#f8f7f4", borderRadius: "25px", padding: "10px", width: "90%" }}>
          <ListItemAvatar>
            <Avatar alt={like.user.username} />
          </ListItemAvatar>
          <div alignItems="flex-start" sx={{ marginTop: 2, textAlign: "left", marginLeft: "25px", backgroundColor: "#f8f7f4", borderRadius: "25px", padding: "10px", width: "80%" }}>
            <Typography variant="body1">
              <b>{like.user.username}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(like.created_at).toLocaleString()}
            </Typography>
          </div>
        </ListItem>
      ))}
  </Box>
)}

          </div>
        </Grid>
      </Grid>


    </div>

  );
};

export default PostView;
