import React from 'react';
import { Container, Button, IconButton, Link, Typography, AppBar } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#f1f1f1' }}>
      <Container className='pt-4'>
        <section className='mb-4'>
          <Button
            color='inherit'
            component={Link}
            href='#!'
            target='_blank'
            rel='noopener'
            style={{ color: 'black' }}

            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>

          <Button
            color='inherit'
            component={Link}
            href='#!'
            target='_blank'
            style={{ color: 'black' }}
            rel='noopener'
            startIcon={<TwitterIcon />}

          >
            Twitter
          </Button>

          <Button
            color='inherit'
            component={Link}
            href='#!'
            target='_blank'
            style={{ color: 'black' }}

            rel='noopener'
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>

          <Button
            color='inherit'
            component={Link}
            href='#!'
            target='_blank'
            rel='noopener'
            style={{ color: 'black' }}

            startIcon={<InstagramIcon />}
          >
            Instagram
          </Button>

          <Button
            color='inherit'
            component={Link}
            href='#!'
            target='_blank'
            rel='noopener'
            style={{ color: 'black' }}

            startIcon={<LinkedInIcon />}
          >
            LinkedIn
          </Button>

          <Button
            color='inherit'
            component={Link}
            href='#!'
            target='_blank'
            rel='noopener'
            style={{ color: 'black' }}

            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </section>
      </Container>

      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '1rem' }}>
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          © 2024 
            Profinder
        </Typography>
      </div>
    </AppBar>
  );
};

export default Footer;
