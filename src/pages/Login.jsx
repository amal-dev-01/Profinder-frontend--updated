import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authAction';
import Loading from './Loading';


const defaultTheme = createTheme();


export default function Login() {
  const navigate = useNavigate()

  const authToken = localStorage.getItem('authtoken')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const { loading, userInfo, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    try {
      dispatch(login(data));

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("User not found. Please check your credentials.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }


  };


  useEffect(() => {
    if (authToken) {
      if (userInfo.is_user || userInfo.is_professional) {
        navigate('/home');

      }

      else if (userInfo.is_admin) {
        navigate('/admin');
      }

      else {
        navigate('/');

      }
      window.location.reload();

    }
    else {
      navigate('/');

    }

  }, [authToken,userInfo])

  // useEffect(() => {
  //   const redirectToPath = () => {
  //     if (userInfo) {
  //       if (userInfo.is_user || userInfo.is_professional) {
  //         navigate('/home');
  //       } else if (userInfo.is_admin) {
  //         navigate('/admin');
  //       } else {
  //         // Handle other roles or scenarios as needed
  //         navigate('/');
  //       }
  //       window.location.reload();
  //     } else {
  //       navigate('/');
  //     }
  //   };

  //   // Call the function without reloading the window
  //   redirectToPath();
  // }, [userInfo]);



  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: "10px" }}>
        <Box>
          <Typography>AppLOgo</Typography>

        </Box><Box>
          <Button onClick={() => navigate('/userselection')}>Register</Button>
        </Box>
      </Box>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src='https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1703399363~exp=1703399963~hmac=3f980e88a150d028c75a1b034979489b6b2d09065c0a95cde45ad1fb37ac96d6'
            alt="Reset Password"
            style={{ width: "100%", padding: "5%", paddingTop: "15%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20%',
            }}
          >
            {error && (
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Alert severity="error">{error === "Request failed with status code 401" ? "Enter valid email and password" : error}</Alert>
              </Stack>
            )}

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '70%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}


              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant='outlined'
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <Loading /> : 'SIGN In'}
              </Button>
            </form>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}


