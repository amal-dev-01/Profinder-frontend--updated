import React, { useState, useEffect } from 'react';
import axiosInstance from '../features/axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
            `post/post/${id}/update/`,
           
            {
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
        const postData = response.data;

        setTitle(postData.title || '');
        setDescription(postData.description || '');
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [id]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.put(
        `post/post/${id}/update/`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log('Data updated:', response.data);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
        Edit Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              sx={{width:'60%'}}

              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              sx={{width:'60%'}}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="outlined">
              Update Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditPost;
