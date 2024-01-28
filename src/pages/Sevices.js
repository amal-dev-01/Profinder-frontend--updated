import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { TextField, InputAdornment } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

import SearchIcon from '@mui/icons-material/Search';
import './Services.css'
const imageList = [
  
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1611021061285-16c871740efa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Carpenter' },

  { id: 6, imageUrl: 'https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15204.jpg', caption: 'Electrical' },
  { id: 7, imageUrl: 'https://img.freepik.com/free-photo/service-maintenance-worker-repairing_23-2149176719.jpg', caption: 'Plumber' },
  { id: 8, imageUrl: 'https://img.freepik.com/free-photo/young-bearded-handsome-builder-wearing-construction-uniform-cap-holding-paint-roller-showing-pointing-up-with-fingers-number-three-while-smiling-confident-isolated-orange-backgr_141793-15702.jpg', caption: 'Painter' },

  { id: 9, imageUrl: 'https://img.freepik.com/free-photo/skilled-electrician-contracted-check-up-outdoor-air-conditioner-starting-work-shift-trained-worker-wearing-protective-gear-preparing-service-faulty-external-hvac-system_482257-63954.jpg', caption: 'Ac mechanic' },
  { id: 10, imageUrl: 'https://img.freepik.com/free-photo/hand-car-mechanic-with-wrench_146671-19679.jpg', caption: 'Car Mechanic' },

  { id: 11, imageUrl: 'https://img.freepik.com/free-photo/tiler-working-renovation-apartment_23-2149278631.jpg', caption: 'Tiler' },
  { id: 12, imageUrl: 'https://img.freepik.com/free-photo/professional-washer-blue-uniform-washing-luxury-car-with-water-gun-open-air-car-wash_496169-333.jpg', caption: 'Car Washing' },
  { id: 13, imageUrl: 'https://img.freepik.com/free-photo/professional-cleaning-service-people-working-together-office_23-2150520599.jpg' ,caption: 'Cleaning' },
  { id: 14, imageUrl: 'https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129804.jpg' ,caption: 'Home Decor' },
  { id: 15, imageUrl: 'https://img.freepik.com/free-photo/woman-chef-cooking-vegetables-pan_1303-22287.jpg' ,caption: 'Chef' },
  { id: 16, imageUrl: 'https://img.freepik.com/free-photo/two-worker-making-gates-smithy_7502-9153.jpg' ,caption: 'Welder' },


];

const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  width: '50%',
  padding: '3%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '0%',
  },
}));



const Services = () => {
  return (

    
    <Grid container spacing={2}>
        <Grid item xs={12}>
         <ResponsiveTextField
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>


    {imageList.map((image) => (
      <Grid item key={image.id} xs={6} sm={6} md={4} lg={3}>
        <Card>
          <CardMedia
            component="img"
            alt={image.caption}
            image={image.imageUrl}
            height={250}
          />
        </Card>
          <Typography variant="subtitle1" style={{fontFamily:'cursive'}}>{image.caption}</Typography>
      </Grid>
    ))}
  </Grid>
);
};

export default Services;