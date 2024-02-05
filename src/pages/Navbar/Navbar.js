import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  logout, userProfile } from '../../features/authAction';
import './Navbar.css'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useEffect } from 'react';
import axiosInstance from '../../features/axios';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { baseURL } from '../../features/baseUrl';
import { selectUserProfile } from '../../features/authSlice';



function Navbar() {

  const [socket, setSocket] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const authToken = localStorage.getItem('authtoken');
  // const isSmallScreen = useMediaQuery('(max-width:600px)');


  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/notify/?token=${authToken}&Content-Type=application/json`);
    setSocket(newSocket);
    newSocket.onopen = () => {
      console.log("WebSocket connected");
      fetchNotifications();
    };

    newSocket.onclose = () => console.log("WebSocket disconnected");
    return () => {
      newSocket.close();
    };
  // }, [socket]);
}, []);

         
  useEffect(() => {
    const handleSocketMessage = () => {
      setNotificationCount((prevCount) => prevCount + 1);
    };

    if (socket) {
      socket.onmessage = handleSocketMessage;
      fetchNotifications();
      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket]);

  
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('book/notification/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNotificationCount(response.data.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

useEffect(() => {
  fetchNotifications();
}, [socket]); 

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)
  const userProfileData = useSelector(selectUserProfile);

  useEffect(() => {
    if (authToken) {
        dispatch(userProfile());
    }
}, [authToken, dispatch]);



  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate('/');
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const navigate = useNavigate()
  const settings = [
    <Typography key="profile" onClick={() => navigate('/profile')}>Profile</Typography>,
    <Typography key="profile" onClick={() => navigate('/chatlist')}>Chat</Typography>,
    <Typography key="profile" onClick={() => navigate('/notifications')}>Notifications</Typography>,

    <Typography key="logout" onClick={handleLogout}>Logout</Typography>,
    userInfo.is_user ? (
      <Typography key="booking" onClick={() => navigate('/userbooking')} sx={{ textTransform: 'none' }}>
        Booking
      </Typography>
    ) : (

      <Typography key="appointment" onClick={() => navigate('/probooking')} sx={{ textTransform: 'none' }}>
        All Appointment
      </Typography>
      
    ),  userInfo.is_user ? (
null    ) : (

      <Typography key="Newappointment" onClick={() => navigate('/probookingaccept')} sx={{ textTransform: 'none' }}>
      New Appointment
    </Typography>
     )
     ,  userInfo.is_user ? (
      null    ) : (
      
            <Typography key="confirm" onClick={() => navigate('/probookingcompleted')} sx={{ textTransform: 'none' }}>
            confirmed Appointment
          </Typography>
           )
           ,  userInfo.is_user ? (
            null    ) : (
            
                  <Typography key="payment" onClick={() => navigate('/checkout')} sx={{ textTransform: 'none' }}>
                  Payment
                </Typography>
                 )
  ];
  

  const pages = [
    <Typography onClick={() => navigate('/home')} sx={{ textTransform: 'none' }}>Home</Typography>,
    // <Typography onClick={() => navigate('/chat')} sx={{ textTransform: 'none' }}>Chat</Typography>,
    // <Typography onClick={() => navigate('/chat')} sx={{ textTransform: 'none' }}>Services</Typography>,
    <Typography onClick={() => navigate('/postlist')} sx={{ textTransform: 'none' }}>Post</Typography>,

  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  //   // You can perform search operations or pass the searchTerm to a parent component
  //   console.log('Searching for:', searchTerm);
  // };
  const userImageURL = userProfileData?.userprofile?.image;
  const professionalImageURL = userProfileData?.professionalprofile?.image;
  // const imageURL = `${baseURL}${professionalImageURL}` || `${baseURL}${userImageURL}` ||  `${baseURL}defaultImage.jpg`;
  let imageURL =`${baseURL}defaultImage.jpg`;

  if (userProfileData?.professionalprofile)
  {
     imageURL = `${baseURL}${professionalImageURL}`
  }
  else{
    imageURL= `${baseURL}${userImageURL}`
  }

  

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
            {userInfo && userInfo.username && (
              <span>{userInfo.username}</span>
            )}

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-center',alignItems:'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton onClick={() => navigate('/notifications')}>
        <NotificationsActiveIcon />
        {notificationCount && (
          <sup style={{ fontWeight:"25px", color: 'red',fontSize:"15px" }}>{notificationCount}</sup>
        )}
          </IconButton>
          {/* <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ marginRight: 2 }}
        /> */}


<Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={()=>navigate("/search")}>
          <SearchIcon sx={{fontSize:"36"}} />
          </IconButton>
        </div>
      </Toolbar>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
       

<Avatar
    alt={`${userInfo.username}`}
    src={imageURL}
  />
                        </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>

              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;