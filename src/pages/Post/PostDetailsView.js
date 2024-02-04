import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPost } from '../../features/authSlice';
import {  useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Grid, IconButton, TextField,Card } from '@mui/material';
import { baseURL } from '../../features/baseUrl';
import CardContent from '@mui/material/CardContent';
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from '@mui/material/Avatar';
import axiosInstance from '../../features/axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { jwtDecode } from 'jwt-decode';
import { List, ListItem, ListItemAvatar, ListItemText,Button,Input } from '@mui/material';
import Navbar from '../Navbar/Navbar';


const PostDetailsView = () => {

  const { id ,} = useParams();
  const authToken = localStorage.getItem('authtoken');
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [deleted, setDeletedt] = useState(false);
  const [postData,setpostData]= useState([])


  const user = authToken ? jwtDecode(authToken) : null;


  const checkIsUserLiked = async () => {
    try {
      const response = await axiosInstance.get(`post/post/${id}/update/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setpostData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postLike = async (id) => {
    try {
      const response = await axiosInstance.post(`post/post/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.status === 201) {
        setLiked(true);

      }
      else if (response.status === 200) {
        setLiked(false);

      }
      else {
        setLiked(true)
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const postComment = async (postId) => {
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
        setCommented((prevCommented) => [...prevCommented, response.data]);
        setCommentText('');
      }
      console.log(response);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };


  useEffect(() => {
    if (authToken) {
      checkIsUserLiked()
    }
  }, [authToken, showComments, showLikes, , liked, commented, deleted]);



  const handleCommentsClick = () => {
    setShowComments(!showComments);
    setShowLikes(false);
  };

  const handleLikesClick = () => {
    setShowLikes(!showLikes);
    setShowComments(false);
  };


  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `post/comment/${commentId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 204) {
        console.log('Comment deleted successfully');
        setDeletedt(true)
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setDeletedt(false)
    }
  };

  const renderDeleteButton = (comment) => {
    if (user && comment.user && user.username === comment.user.username) {
      return (
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteComment(comment.id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      );
    }
    return null;
  };


  const reversedComments = postData.comments && [...postData.comments].reverse();



  if (!postData) {
    return (
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="body1">Post not found</Typography>
        </Paper>
      </Container>
    );
  }
  console.log(postData);

  return (
    
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2%' }}>
        <Navbar />
  
        <Card sx={{ maxWidth: '600px', width: '100%' }}>
          <img src={`${baseURL}${postData.post}`} alt="Post" style={{ maxWidth: '100%' }} />
  
          <CardContent>
            <Typography variant="h6" component="div">
              {postData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postData.description}
            </Typography>
          </CardContent>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '10px' }}>
                <IconButton onClick={() => postLike(postData.id)}>
                  {liked ? (
                    <FavoriteIcon sx={{ fontSize: { sm: 27 }, color: 'red', cursor: 'pointer' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: { sm: 27 }, cursor: 'pointer' }} />
                  )}
                </IconButton>
                  {postData?.likes?.length}
              </div>
              <div style={{ padding: '10px' }}>
                <IconButton aria-label="show more" onClick={handleCommentsClick}>
                  <CommentIcon />
                </IconButton>
                {postData?.comments?.length}
              </div>
            </div>
            <IconButton onClick={handleLikesClick}>
              <FavoriteIcon sx={{ fontSize: { sm: 27 }, cursor: 'pointer' }} />
            </IconButton>
          </div>
        </Card>
  
        {showComments && (
          <Box sx={{ width: '100%', maxWidth: '600px',padding:"50px" }}>
          <Typography paragraph>
                          <TextField
                            label="Add comments"
                            variant="outlined"
                            size="small"
                            style={{ width: "80%" }}
                            value={commentText}
                            onChange={handleCommentChange}
                          />
                          <IconButton onClick={() => postComment(postData.id)}><SendIcon /></IconButton>
                        </Typography>
            <List>
              {postData.comments &&
                postData.comments.slice().reverse().map((comment) => (
                  <ListItem key={comment.id} alignItems="flex-start" sx={{ marginTop: 2,  textAlign: "left",marginLeft:"25px",backgroundColor:"#f8f7f4",borderRadius:"25px" ,padding:"10px",width: "90%"}}>
                    <ListItemAvatar>
                    <Avatar 
                          alt={`${comment.username}`}
                          src={
                            comment.professionalprofile
                              ? `${baseURL}${comment.professionalprofile?.image}`
                              : `${baseURL}${comment.userprofile?.image}`
                          }
                        />                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body1" color="textPrimary">
                            <b>{comment.user.username}</b>
                          </Typography>
                          {` - ${comment.text}`}
                          {renderDeleteButton(comment)}
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
{showLikes && (
  <Box sx={{ width: '100%', maxWidth: '600px' }}>
    {postData.likes &&
      postData.likes.map((like) => (
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
  
  )
}

export default PostDetailsView
