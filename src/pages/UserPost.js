import React from 'react';
import { Container, Card, CardContent, CardMedia, Grid, Typography, Divider } from '@mui/material';
import { Avatar, Facebook, Twitter, Instagram, Edit } from '@mui/icons-material';

const UserPost = () => {
  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <Container className="py-5 h-100">
        <Grid container justifyContent="center" alignItems="center" className="h-100">
          <Grid item lg={6} mb={4} mb-lg={0}>
            <Card style={{ borderRadius: '.5rem' }}>
              <Grid container>
                <Grid item md={4} className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <CardMedia component="img" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: 80 }} />
                  <Typography variant="h5">Marie Horwitz</Typography>
                  <Typography variant="subtitle1">Web Designer</Typography>
                  <Edit className="mb-5" />
                </Grid>
                <Grid item md={8}>
                  <CardContent>
                    <Typography variant="h6">Information</Typography>
                    <Divider variant="middle" className="mt-0 mb-4" />
                    <Grid container paddingTop={1}>
                      <Grid item xs={6} mb={3}>
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="body2" color="textSecondary">info@example.com</Typography>
                      </Grid>
                      <Grid item xs={6} mb={3}>
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" color="textSecondary">123 456 789</Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="h6">Projects</Typography>
                    <Divider variant="middle" className="mt-0 mb-4" />
                    <Grid container paddingTop={1}>
                      <Grid item xs={6} mb={3}>
                        <Typography variant="h6">Recent</Typography>
                        <Typography variant="body2" color="textSecondary">Lorem ipsum</Typography>
                      </Grid>
                      <Grid item xs={6} mb={3}>
                        <Typography variant="h6">Most Viewed</Typography>
                        <Typography variant="body2" color="textSecondary">Dolor sit amet</Typography>
                      </Grid>
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                      <a href="#!"><Facebook fontSize="large" className="me-3" /></a>
                      <a href="#!"><Twitter fontSize="large" className="me-3" /></a>
                      <a href="#!"><Instagram fontSize="large" /></a>
                    </div>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default UserPost;
