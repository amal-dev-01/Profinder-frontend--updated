import React, { useEffect, useState } from 'react';
import axiosInstance from '../features/axios';
import { baseURL } from '../features/baseUrl';
import { jwtDecode } from 'jwt-decode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppSidebar from './Sidebar';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostList = () => {
  

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  const authToken = localStorage.getItem('authtoken');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false)
  const user = authToken ? jwtDecode(authToken) : null;


  const listPosts = async () => {
    try {
      const response = await axiosInstance.get('post/allpost/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
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
  }, [authToken, liked]);

  const isUserLiked = (post) => {
    return post.likes.some((like) => like.user.username === user.username);
  };
  // const isUserLiked = (post) => {
  //   return (post.likes || []).some((like) => like.user.username === user.username);
  // };

  const likePost = async (postId) => {
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
        setLiked(!liked)
        // setPosts((prevPosts) =>
        //   prevPosts.map((prevPost) =>
        //     prevPost.id === postId ? { ...prevPost, likes: response.data.likes } : prevPost
        //   )
        // );
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

 console.log(posts);

  return (
    <div>
      <AppSidebar/>

      <h2>Post List</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        
        <div style={{display:"flex",justifyContent:"center"}}>
          <Card style={{width:"50%"}}>
          {posts.map((post) => (
            <div key={post.id}>
       <CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      {post.username}
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
  style={{ width: "100%" }}
  image={`${baseURL}/${post.post}`}
  alt="post"
/>
              <div >
                {/* <img src={`${baseURL}/${post.post}`} alt="Post" style={{ width: "100%" }} /> */}
              <div style={{display:"flex",justifyContent:"left",paddingLeft:"2%"}}> 
                {isUserLiked(post) ?<FavoriteIcon
                  onClick={() => likePost(post.id)}
                  sx={{ fontSize: 40, color:'red', cursor: 'pointer' }}
                />:
                <FavoriteBorder onClick={() => likePost(post.id)} sx={{ fontSize: 40 ,cursor: 'pointer' }}style={{paddingRight:"2%"}} />}
                <CommentOutlinedIcon sx={{ fontSize: 40 ,cursor: 'pointer' }} />
              </div>
              </div>
            </div>
          ))}
          </Card>
        </div>
//         <div style={{display:"flex",justifyContent:"center"}}>
//         <div>
//         {posts.map((post) => (
// <Card sx={{ maxWidth: 345 }}>
// <CardHeader
//   avatar={
//     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//       {post.username}
//     </Avatar>
//   }
//   action={
//     <IconButton aria-label="settings">
//       <MoreVertIcon />
//     </IconButton>
//   }
//   title={post.title}
//   subheader={post.created_at}
// />
// <CardMedia
//   component="img"
//   height="194"
//   image={`${baseURL}/${post.post}`}
//   alt="post"
// />
// <CardContent>
  
// </CardContent>
// <CardActions disableSpacing>
//   <IconButton aria-label="add to favorites">
//   {isUserLiked(post) ?<FavoriteIcon
//   onClick={() => likePost(post.id)}
//   sx={{ fontSize: 30, color:'red', cursor: 'pointer' }}
// />:
// <FavoriteBorder onClick={() => likePost(post.id)} sx={{ fontSize: 30 ,cursor: 'pointer' }} />}
//   </IconButton>
//   <IconButton aria-label="comment">
//   <CommentOutlinedIcon sx={{ fontSize: 30 ,cursor: 'pointer' }} />
//   </IconButton>


//   <IconButton aria-label="share">
//     <ShareIcon />
//   </IconButton>
//   {/* <ExpandMore
//     expand={expanded}
//     onClick={handleExpandClick}
//     aria-expanded={expanded}
//     aria-label="show more"
//   >
//     <ExpandMoreIcon />
//   </ExpandMore> */}
// </CardActions>
// <Collapse in={expanded} timeout="auto" unmountOnExit>
//   <CardContent>
//     <Typography paragraph>Description</Typography>
//     <Typography paragraph>
//      {post.description}
//     </Typography>
//   </CardContent>
// </Collapse>
// </Card>

      //   ))}
      // </div>
      // </div>
      )}
    </div>
  );
};

export default PostList;
