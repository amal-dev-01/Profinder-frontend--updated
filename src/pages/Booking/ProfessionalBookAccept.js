import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography,CardActions,Button } from '@mui/material';
import axiosInstance from '../../features/axios';


const ProfessionalBookAccept = () => {
    const [booking,setBooking]=useState()
    const authToken = localStorage.getItem('authtoken');


    const UserBookingList = async () => {
        try {
          const response = await axiosInstance.get('book/professional_bookings/', {
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
      
     const handleAccept = async (action, bookingId) => {
  try {
    const response = await axiosInstance.post(
      `book/professional_bookings/${bookingId}/${action}/`,
      {},  // Empty request body
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Booking accepted successfully');
      // Handle success, update state, or perform other actions
    } else {
      // Handle other HTTP status codes if needed
      console.error('Failed to accept booking:', response.data);
    }
  } catch (error) {
    console.error('Error accepting booking:', error);
  }
};

      useEffect(() => {
        if (authToken) {
            UserBookingList()
        }
      }, [authToken]);
    
    
    


  return (
    <div>
         {booking && booking.length > 0 ? (
    booking.map((book) => (
      <div key={book.id}>
        <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{textAlign:'left'}}>
        <Typography>Professional :   {book.professional_name}</Typography>
        <Typography>User :{book.user_name}</Typography>
        <Typography variant="body2" color="text.secondary">
        <Typography>Address: {book.address}</Typography>
        <Typography>date: {book.booking_date}</Typography>
        <Typography>Is_paid: {book.is_paid}</Typography>
        <Typography>status: {book.status}</Typography>
        <Typography>job: {book.job}</Typography>
        </Typography>

      </CardContent>
      <CardActions>
      <Button size="small" onClick={() => handleAccept('confirm', book.id)}>Accept</Button>
        <Button size="small"  onClick={()=>{handleAccept('cancel')}} >Reject</Button>
    </CardActions>
    </Card>
    </div>
  ))
  ) : (
      
      <Typography>No bookings available.</Typography>
      )}
    </div>
  )
}

export default ProfessionalBookAccept
