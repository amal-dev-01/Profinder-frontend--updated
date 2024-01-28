import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios';
import { Card, CardContent, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';

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
    <Navbar/>
    <div style={{width:"100%",padding:"20px"}}>
          {booking && booking.length > 0 ? (
    booking.map((book) => (
      <div key={book.id}>
        <Card sx={{ marginBottom: 5 }}>
      <CardContent sx={{textAlign:'left'}}>
        <Typography>Professional :   {book.professional_name}</Typography>
        <Typography>User :{book.user_name}</Typography>
        <Typography variant="body2" color="text.secondary">
        <Typography>Address: {book.address}</Typography>
        <Typography>date: {book.booking_date}</Typography>
        <Typography>Is_paid: {book.is_paid}</Typography>
        <Typography style={{ color: book.status === 'confirmed' ? 'green' : 'black' }}>
  status: {book.status}
</Typography>
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

      
    </div></div>
  )
}

export default ProfessionalBook
