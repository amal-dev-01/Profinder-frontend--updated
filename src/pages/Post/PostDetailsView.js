import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPost } from '../../features/authSlice';
import {  useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Grid, IconButton, TextField,Card } from '@mui/material';
import { baseURL } from '../../features/baseUrl';
import CardContent from '@mui/material/CardContent';
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from '@mui/material/Avatar';
import { userPost } from '../../features/authAction';
import axiosInstance from '../../features/axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { jwtDecode } from 'jwt-decode';

const PostDetailsView = () => {

  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');
  const userPostData = useSelector(selectUserPost);
  const dispatch = useDispatch();
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
      // console.log(response.data,'kkkk');
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
      // dispatch(userPost(id));
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





  if (!userPostData) {
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
    <div>
      <div style={{ display: "flex" }}>
        <Grid container spacing={2} style={{ padding: "2%" }} >
          <Grid item xs={8} sm={6}>
            <div>
              <img src={`${baseURL}${postData.post}`} alt="Post" style={{ maxWidth: '100%' }} />

              <div style={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ padding: "10px" }}>
                    {liked ? (
                      <IconButton onClick={() => postLike(id)}>
                        <FavoriteIcon sx={{ fontSize: { sm: 27 }, color: 'red', cursor: 'pointer' }} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => postLike(id)}>
                        <FavoriteBorderIcon sx={{ fontSize: { sm: 27 }, cursor: 'pointer' }} />
                      </IconButton>

                    )}
                    {postData.likes.length}

                  </div>
                  <div style={{ padding: "10px" }}>
                    <IconButton
                      aria-label="show more"
                      onClick={handleCommentsClick}
                    >
                      <CommentIcon />
                    </IconButton>
                    {postData.comments.length}
                  </div>
                </div>
                <FavoriteIcon onClick={handleLikesClick} />
              </div>
            </div>

            <CardContent>
              <Typography variant="h6" component="div">
                {postData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {postData.description}
              </Typography>
            </CardContent>
          </Grid>

          <Grid item xs={4} sm={6}>
          <Card sx={{ maxWidth: 345 }}>

            <div style={{ height: "100%", padding: "5%", display: "flex", alignItems: "center", justifyContent: "center" }}>

              {showComments && (
                <Box>
                  <Typography paragraph>
                    <TextField
                      label="Add a comment"
                      variant="standard"
                      size="small"
                      style={{ width: "80%" }}
                      value={commentText}
                      onChange={handleCommentChange}
                    />
                    <IconButton onClick={() => postComment(id)}><SendIcon /></IconButton>
                  </Typography>
                  {postData.comments && postData.comments.map((comment) => (
                    <div className='comment-list' key={comment.id}>
                      <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar>{comment.user.username[0].toUpperCase()}</Avatar>

                        <div style={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1">
                            <b>{comment.user.username}</b> {comment.text}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(comment.created_at).toLocaleString()}{renderDeleteButton(comment)}
                          </Typography>
                        </div>
                        <div>
                        </div>
                      </Box>
                    </div>
                  ))}
                </Box>
              )}


              {showLikes && (
                <Box>
                  {postData.likes && postData.likes.map((like) => (
                    <div key={like.id}>
                      <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar>{like.user.username[0].toUpperCase()}</Avatar>
                        <div style={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1">
                            <b>{like.user.username}</b>
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(like.created_at).toLocaleString()}
                          </Typography>
                        </div>
                        <div>
                        </div>
                      </Box>

                    </div>
                  ))}
                </Box>
              )}
            </div>
            </Card>
          </Grid>
        </Grid>


      </div>

    </div>
  )
}

export default PostDetailsView