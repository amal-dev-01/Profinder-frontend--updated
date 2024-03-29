import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography,CardActions,Button } from '@mui/material';
import axiosInstance from '../../features/axios';
import Navbar from '../Navbar/Navbar';


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
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Booking accepted successfully');
      // const updatedResponse = await axiosInstance.get('book/professional_bookings/', {
      //   headers: {
      //     Authorization: `Bearer ${authToken}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
  
      // if (updatedResponse) {
      //   console.log(updatedResponse.data);
      //   setBooking(updatedResponse.data);
      // }
  
    } else {
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
      <Navbar/>
          <div style={{width:"100%",padding:"20px"}}>
         {booking && booking.length > 0 ? (
    booking.map((book) => (
      <div key={book.id}>
        <Card sx={{ marginBottom: 2 }}>
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
      <Button size="small" onClick={() => handleAccept('confirm', book.id)}>
  Accept Appointment
</Button>
<Button size="small" onClick={() => handleAccept('cancel', book.id)}>
  Reject Appointment
</Button>

    </CardActions>
    </Card>
    </div>
  ))
  ) : (
      
      <Typography>No bookings available.</Typography>
      )}
    </div>
    </div>
  )
}

export default ProfessionalBookAccept
