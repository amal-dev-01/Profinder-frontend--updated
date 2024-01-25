import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfile } from '../features/authAction';

const UserProfile = () => {
  const {id}=useParams()
  const navigate = useNavigate();
  const user = useSelector(state => state.user.getUser);
  const dispatch = useDispatch();
  
  const authToken = localStorage.getItem('authtoken')
  useEffect(() => {
    dispatch(getUserProfile(id)); 
  }, [dispatch, id]);
  
  console.log('datatttt',user);

  if (!user) {
    return <div>Loading...</div>; }

    return (
<div className="parentcard">  
  <div className="outercard">
    
    {/* <img src='https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Background" /> */}
  </div>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
</div>



  );
};



export default UserProfile;
