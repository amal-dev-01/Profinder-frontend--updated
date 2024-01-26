import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios';
import { Card, CardContent, Typography } from '@mui/material';

const ProfessionalBook = () => {
    const [booking,setBooking]=useState()
    const authToken = localStorage.getItem('authtoken');


    const bookingList = async () => {
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
      


      useEffect(() => {
        if (authToken) {
            bookingList()
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
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
    </CardActions> */}
    </Card>
    </div>
  ))
  ) : (
      
      <Typography>No bookings available.</Typography>
      )}

      
    </div>
  )
}

export default ProfessionalBook
