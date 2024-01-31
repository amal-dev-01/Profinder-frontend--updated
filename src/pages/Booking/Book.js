import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axiosInstance from '../../features/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Book() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authtoken');
  const { id, username } = useParams();
  const [bookingData, setBookingData] = useState({
    booking_date: '',
    address: '',
    job: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axiosInstance.post(
        `/book/booking/${id}/`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      
      if (response.status === 201) {
        navigate('/userprofile');
      } else {
      }
    } catch (error) {
      console.error('Error posting booking request:', error);
    }
  };

 

  return (
    <Container component="main" maxWidth="xs">
<Navbar/>
      <Typography variant="h5" align="center" gutterBottom>
        Booking Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Booking Date"
          type="datetime-local"
          name="booking_date"
          value={bookingData.booking_date}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
    
        <TextField
          label="Address"
          name="address"
          value={bookingData.address}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Job"
          name="job"
          value={bookingData.job}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
     
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Booking Request
        </Button>
      </form>
    </Container>
  );
}

export default Book;
