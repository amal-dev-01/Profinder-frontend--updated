import React, { useState, useEffect } from 'react';
import axiosInstance from '../features/axios';

const Like = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);  
    const authToken = localStorage.getItem('authtoken');
  
    const handleLike = async (postId) => {
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
        
            if (response.status === 201) {
              setLiked(true);
            } else if (response.status === 200) {
              setLiked(false);
            } else {
              setLiked('');
            }
        
            console.log(response);
          } catch (error) {
            console.error(error);
          }
    };
  
    useEffect(() => {
      const checkLikeStatus = async (postId) => {
        try {
          const response = await axiosInstance(`/post/${postId}/like/status/`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setLiked(data.liked);
          } else {
            console.error('Failed to fetch like status for the post');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);  
        }
      };
  
      checkLikeStatus();
    }, [postId, authToken]);
  
    if (loading) {
      return <p>Loading...</p>;  
    }
  
    return (
      <button onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'} Post
      </button>
    );
  };
  
  export default Like;