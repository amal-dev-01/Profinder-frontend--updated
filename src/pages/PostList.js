import React, { useEffect, useState } from 'react';
import axiosInstance from '../features/axios';
import { baseURL } from '../features/baseUrl';
import { Alert, Button, Stack } from '@mui/material';

const PostList = () => {
  const authToken = localStorage.getItem('authtoken');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [liked,setLiked]=useState('')

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
  }, [authToken]);




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

      if(response.status ===201){
        setLiked('Liked Sucessfully')
      }
      else if(response.status ===200){
        setLiked('DisLiked Sucessfully')
      }
      else{
        setLiked('')

      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Post List</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
              <p>{post.description}</p>
              <div style={{marginLeft:"20%",marginRight:"20%"}}>
        

              <img src={`${baseURL}/${post.post}`} alt="Post" style={{width:"100%" }} />
              <Button onClick={() => likePost(post.id)}>Like</Button>
              <Button>comment</Button>

                </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
