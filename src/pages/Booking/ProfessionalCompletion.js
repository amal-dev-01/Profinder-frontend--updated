import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import axiosInstance from '../../features/axios';
import Navbar from '../Navbar/Navbar';

const ProfessionalCompletion = () => {
  const [booking, setBooking] = useState([]);
  const [paymentAmounts, setPaymentAmounts] = useState({});

  const authToken = localStorage.getItem('authtoken');

  const BookingList = async () => {
    try {
      const response = await axiosInstance.get('book/professional_bookings_accepted/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        console.log(response.data);
        setBooking(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      const response = await axiosInstance.patch(
        `book/complete_work/${bookingId}/`,
        { payment_amount: paymentAmounts[bookingId] || 0 },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Job successfully completed');
      } else {
        console.error('Failed to complete job:', response.data);
      }
    } catch (error) {
      console.error('Error completing job:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      BookingList();
    }
  }, [authToken,handleComplete]);

  return (
    <div>
      <Navbar />
      <div style={{ width: '100%', padding: '20px' }}>
        {booking && booking.length > 0 ? (
          booking.map((book) => (
            <div key={book.id}>
              <Card sx={{ marginBottom: 5 }}>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography>Professional: {book.professional_name}</Typography>
                  <Typography>User: {book.user_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Typography>Address: {book.address}</Typography>
                    <Typography>Date: {book.booking_date}</Typography>
                    <Typography>Is_paid: {book.is_paid}</Typography>
                    <Typography>Status: {book.status}</Typography>
                    <Typography>Job: {book.job}</Typography>
                  </Typography>
                </CardContent>
                <TextField
                  label="Payment Amount"
                  type="number"
                  value={paymentAmounts[book.id] || ''}
                  onChange={(e) => setPaymentAmounts((prev) => ({ ...prev, [book.id]: e.target.value }))}
                  fullWidth
                  required
                  margin="normal"
                />
                <Button size="small" onClick={() => handleComplete(book.id)}>
                  Make Payment
                </Button>
                <CardActions></CardActions>
              </Card>
            </div>
          ))
        ) : (
          <Typography>No bookings available.</Typography>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCompletion;
