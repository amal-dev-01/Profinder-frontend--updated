import React, { useState } from 'react';
import axiosInstance from '../features/axios';
import { Container, Typography, TextField, TextareaAutosize, Button, Grid ,Alert,Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
  const authToken = localStorage.getItem('authtoken');
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    post: null, 
  });

  const handleChange = (e) => {
    if (e.target.name === 'post') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('description', formData.description);
      postData.append('post', formData.post);

      const response = await axiosInstance.post('post/post/', postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);  

      if (response.status === 201) {
        console.log('Post created:', response.data);
        setSuccessMessage('Post uploaded successfully!');
        setTimeout(() => {
          navigate('/profile');
        }, 2000);

      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Post
      </Typography>
      
      {successMessage && (
        <Stack spacing={2} mb={2}>
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title}
              style={{ width: '84%', padding: '10px', borderRadius: '5px' }}

              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              rowsMin={3}
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: '80%', padding: '10px', borderRadius: '5px' }}
            />
          </Grid>

          <Grid item xs={12}>
            <input type="file" name="post" onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{width:'80%'}}>
              Create Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </div>
  );
};

export default CreatePost;
