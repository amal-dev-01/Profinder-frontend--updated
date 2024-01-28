import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';

const UserSelection = () => {


    const navigate = useNavigate()

  return (
    <div style={{padding:"10%"}} >

        <Typography variant='h3' sx={{padding:5}}>User Selection</Typography>

<Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ minWidth: 100 }} onClick={()=>navigate("/register")}>
          <CardContent>
        
          <AccountCircleOutlinedIcon sx={{ fontSize: 60 }} />
          <Typography>You Want An Expert</Typography>

          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
      <Card sx={{ minWidth: 100 }} onClick={()=>navigate("/professionalregister")}>
          <CardContent>
          <SupervisedUserCircleOutlinedIcon sx={{ fontSize: 60 }} />
          <Typography>You Are An Expert</Typography>

          </CardContent>
          
        </Card>
      </Grid>
      </Grid>


  
      
    </div>
  )
}

export default UserSelection
