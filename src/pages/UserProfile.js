import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserProfile } from '../features/authSlice';
import { userProfile } from '../features/authAction';
import { Button } from '@mui/material';
import UserPost from './UserPost';
import axiosInstance from '../features/axios';
import { baseURL } from '../features/baseUrl';

const UserProfile = () => {
  const navigate = useNavigate();
  const userProfileData = useSelector(selectUserProfile);
  const authToken = localStorage.getItem('authtoken');
  const dispatch = useDispatch();


  const [posts, setPosts] = useState([])


  const postList = async () => {
    try {
      const response = await axiosInstance.get('post/post/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {

        setPosts(response.data)
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
      postList()
    }
  }, [authToken, dispatch]);
// console.log(posts);

  return (
<div className="parentcard">
  <div className="outercard">
    <img src='https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Background" />
  </div>
  <div className='innercard'>
    {userProfileData?.userprofile && (
      <div className='profileimg'>
        <img src={`http://127.0.0.1:8000/${userProfileData.userprofile.image}`} alt="Profile Image" />
        <div className='name'>{userProfileData.username}</div>
        <div className='name'>{userProfileData.first_name} {userProfileData.last_name}</div>
        <div>{userProfileData.userprofile.bio}</div>
        <Button onClick={() => navigate('/editprofile')}>Edit Profile</Button>
        <Button onClick={() => navigate('/addpost')}>Add Post</Button>
      </div>
    )}
  </div>
  <div className="postlist">
    <h3>Post</h3>
    <div className="post-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <img src={`${baseURL}/${post.post}`} alt="Post Image" onClick={() => navigate(`/postview/${post.id}`)} />
        </div>
      ))}
    </div>
  </div>
</div>



  );
};



export default UserProfile;
