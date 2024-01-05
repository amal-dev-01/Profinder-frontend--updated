import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, userProfile, } from '../features/authAction';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Navbar from './Navbar';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading,userInfo,authtoken}=useSelector((state) => state.user)
    

    const handleLogout = async () => {
      try {
        dispatch(logout());
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    const getUserProfile = async () => {
      try {
        dispatch(userProfile());
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    useEffect(() => {
      getUserProfile();
    }, []);
  
  return (
    <div>
      <header>
        <Navbar/>
      </header>
        <h2>Home</h2>
        {userInfo && userInfo.username && (
        <div>
          <strong>Username:</strong> {userInfo.username}
        </div>
      )}



        <button onClick={handleLogout}>Logout</button>
        {/* <button onClick={getUserProfile}>Profile</button> */}
    </div>
  )
}

export default Home
