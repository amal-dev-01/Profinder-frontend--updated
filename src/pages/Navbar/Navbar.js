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
import { logout } from '../../features/authAction';
import './Navbar.css'


function Navbar() {

  // let logoutUser = () => {
  //   const shouldLogout = window.confirm("Are you sure you want to log out?");
  //   if (shouldLogout) {
  //     // SetAuthToken(null);
  //     // SetUser(null);
  //     localStorage.removeItem('authToken');
  //     nav('/');
  //   }
  // }

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)
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
    <Typography onClick={() => navigate('/chat')} sx={{ textTransform: 'none' }}>Chat</Typography>,
    <Typography onClick={() => navigate('/chat')} sx={{ textTransform: 'none' }}>Services</Typography>,
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
            LOGO
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
          <div className="searchbar">
    <div className="searchbar-wrapper">
        <div className="searchbar-left">
            <div className="search-icon-wrapper">
                <span className="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                        </path>
                    </svg>
                </span>
            </div>
        </div>

        <div className="searchbar-center">
            <div className="searchbar-input-spacer"></div>

            <input type="text" className="searchbar-input" maxlength="2048" name="q" autocapitalize="off" autocomplete="off" title="Search" role="combobox" placeholder="Search ... "/>
        </div>

        <div className="searchbar-right">

        </div>
    </div>
</div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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