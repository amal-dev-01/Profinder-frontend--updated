import React, { useEffect, useState } from 'react';
import axiosInstance from '../features/axios';
import { baseURL } from '../features/baseUrl';
import { jwtDecode } from 'jwt-decode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const PostList = () => {
  const [expandedState, setExpandedState] = useState({});
  const [showFullDescription, setShowFullDescription] = useState({});
  const authToken = localStorage.getItem('authtoken');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [deleted, setDeleted] = useState("");


  const user = authToken ? jwtDecode(authToken) : null;

  const handleExpandClick = (postId) => {
    setExpandedState((prevExpandedState) => ({
      ...prevExpandedState,
      [postId]: !prevExpandedState[postId],
    }));
  };

  const handleReadMoreClick = (postId) => {
    setShowFullDescription((prevShowFullDescription) => ({
      ...prevShowFullDescription,
      [postId]: true,
    }));
  };

  const listPosts = async () => {
    try {
      const response = await axiosInstance.get('post/allpost/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching posts. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      listPosts();
    }
  }, [authToken, liked, commented,deleted]);

  const isUserLiked = (post) => {
    return post.likes.some((like) => like.user.username === user.username);
  };

  const postLike = async (postId) => {
    try {
      const response = await axiosInstance.post(
        `post/post/${postId}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setLiked(!liked);
      }
      console.log(response);
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
        setDeleted(" ")

        console.log('Comment deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  



  const renderDeleteButton = (comment) => {
    if (user && comment.user.username === user.username) {
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

  return (
    <div>
      <h2>Explore</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 400 }}>
            {posts.map((post) => (
              <div key={post.id}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                      {post.user}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.title}
                  subheader={post.created_at}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={`${baseURL}${post.post}`}
                  alt="No post"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {showFullDescription[post.id]
                      ? post.description
                      : `${post.description.slice(0, 50)}...`}
                    {!showFullDescription[post.id] && (
                      <Tooltip title="Read More">
                        <IconButton
                          aria-label="read more"
                          onClick={() => handleReadMoreClick(post.id)}
                        >
                          <ReadMoreIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {/* <IconButton aria-label="add to favorites"> */}
                    {isUserLiked(post) ? (
                      <IconButton  onClick={() => postLike(post.id)}
                      sx={{ fontSize: { sm: 27 }, color: 'red', cursor: 'pointer' }}>
                      <FavoriteIcon/>
                      </IconButton>
                    ) : (
                      <IconButton   onClick={() => postLike(post.id)}
                      sx={{ fontSize: { sm: 27 }, cursor: 'pointer' }}>

                      <FavoriteBorderIcon
                      
                      />
                      </IconButton>
                    )}
                  {/* </IconButton> */}
                  {post.likes.length}
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <Tooltip title={expandedState[post.id] ? 'Collapse' : 'Expand'}>
                    <div>
                      <IconButton
                        aria-label="show more"
                        onClick={() => handleExpandClick(post.id)}
                      >
                        <CommentIcon />
                      </IconButton>
                      {post.comments.length}
                    </div>
                  </Tooltip>
                </CardActions>
                <Collapse in={expandedState[post.id]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      <TextField
                        label="Add a comment"
                        variant="standard"
                        size="small"
                        fullWidth
                        value={commentText}
                        onChange={handleCommentChange}
                      />
                      <Button onClick={() => postComment(post.id)}>Post</Button>
                    </Typography>
                    <Typography paragraph>Comments</Typography>
                    <Typography paragraph>
                      {post.comments.map((comment) => (
                        <div className='comment-list' key={comment.id}>
                          <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center',textAlign:"left" }}>
                            <Avatar>{comment.user.username[0].toUpperCase()}</Avatar>
                            <div style={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="body1">
                                <b>{comment.user.username}</b> {comment.text}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {new Date(comment.created_at).toLocaleString()}{renderDeleteButton(comment)}     
                              </Typography>
                                                     </div>
                          </Box>
                        </div>
                      ))}
                    </Typography>
                  </CardContent>
                </Collapse>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

export default PostList;
