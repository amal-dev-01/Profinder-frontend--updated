import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { TextField, InputAdornment } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

import SearchIcon from '@mui/icons-material/Search';
import './Services.css'
const imageList = [
  
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1611021061285-16c871740efa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Carpenter' },

  { id: 6, imageUrl: 'https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15204.jpg?w=1060&t=st=1705990583~exp=1705991183~hmac=c77b788da58df357d1046ca67f09e7704939c084718eb48b57fc28be10a99b76', caption: 'Electrical' },
  { id: 7, imageUrl: 'https://img.freepik.com/free-photo/service-maintenance-worker-repairing_23-2149176719.jpg?w=1060&t=st=1705990668~exp=1705991268~hmac=8428c5fc23ebec86f6f6d02c8fadb76c6200e4b4049747ee38a37427b6d1c7d6', caption: 'Plumber' },
  { id: 8, imageUrl: 'https://img.freepik.com/free-photo/young-bearded-handsome-builder-wearing-construction-uniform-cap-holding-paint-roller-showing-pointing-up-with-fingers-number-three-while-smiling-confident-isolated-orange-backgr_141793-15702.jpg?w=1060&t=st=1705990759~exp=1705991359~hmac=fc71afc922e2cb1879f8c48fb448e8a42575aaaae2f9e84d01049c1f358fd626', caption: 'Painter' },

  { id: 9, imageUrl: 'https://img.freepik.com/free-photo/skilled-electrician-contracted-check-up-outdoor-air-conditioner-starting-work-shift-trained-worker-wearing-protective-gear-preparing-service-faulty-external-hvac-system_482257-63954.jpg?w=1060&t=st=1705990830~exp=1705991430~hmac=03db3a50c54110e0e598995159ec9d8cb135e2b9f07a21dd985cb665affa4b8a', caption: 'Ac mechanic' },
  { id: 10, imageUrl: 'https://img.freepik.com/free-photo/hand-car-mechanic-with-wrench_146671-19679.jpg?w=1060&t=st=1705990879~exp=1705991479~hmac=7f505789b9c07a48b64f48342204eef5ece017b031c71c7298656f29de64603d', caption: 'Car Mechanic' },

  { id: 11, imageUrl: 'https://img.freepik.com/free-photo/tiler-working-renovation-apartment_23-2149278631.jpg?w=1060&t=st=1705990935~exp=1705991535~hmac=d038adaf926b8fe38ebaf178a8ee24ea58304010a38d8ba02d15871b121a58d6', caption: 'Tiler' },

  { id: 12, imageUrl: 'https://img.freepik.com/free-photo/professional-washer-blue-uniform-washing-luxury-car-with-water-gun-open-air-car-wash_496169-333.jpg?w=1060&t=st=1705991001~exp=1705991601~hmac=0c567151e29c04389f5a77aa0231b7cf4424a5c2d1037f247af26baeac2babfc', caption: 'Car Washing' },

  { id: 13, imageUrl: 'https://img.freepik.com/free-photo/professional-cleaning-service-people-working-together-office_23-2150520599.jpg?w=1060&t=st=1705991128~exp=1705991728~hmac=8fa79fb1880299210d4671bd1b39eb7b71b6737029f7000495571c3061a0480c' ,caption: 'Cleaning' },
  { id: 14, imageUrl: 'https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129804.jpg?w=1060&t=st=1705991271~exp=1705991871~hmac=f962e33107fede094aa81f12f1966c51095de2b53be0e73c10ef4ad27ad459e7' ,caption: 'Home Decor' },

  { id: 15, imageUrl: 'https://img.freepik.com/free-photo/woman-chef-cooking-vegetables-pan_1303-22287.jpg?w=1060&t=st=1705991377~exp=1705991977~hmac=934414eb1d237e48ac8d501da20b2113a9108284b7c1f2485ea8f9185578b9c2' ,caption: 'Chef' },
  { id: 16, imageUrl: 'https://img.freepik.com/free-photo/two-worker-making-gates-smithy_7502-9153.jpg?t=st=1705991671~exp=1705992271~hmac=eb37b0ad5983e29afa9a4870ec8bce2588663e74785aa52678a7dd4644072618' ,caption: 'Welder' },


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
      <Grid item key={image.id} xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardMedia
            component="img"
            alt={image.caption}
            image={image.imageUrl}
            height={250}
          />
          <CardContent>
            <Typography variant="subtitle1">{image.caption}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
};

export default Services;