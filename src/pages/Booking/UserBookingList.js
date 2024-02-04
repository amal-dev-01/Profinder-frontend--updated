import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../features/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const UserBookingList = () => {

    const [booking,setBooking]=useState()
    const authToken = localStorage.getItem('authtoken');
const navigate = useNavigate()

    const bookingList = async () => {
        try {
          const response = await axiosInstance.get('book/bookings/', {
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
    <div style={{width:"100%"}}>
            <Navbar/>

  {booking && booking.length > 0 ? (
    booking.map((book) => (
      <div key={book.id}>
        <Card sx={{marginBottom:2}}>
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
  {book.is_paid ? (
    <Button size="small" onClick={() => navigate(`/userconfirmation/${book.id}`)}>
      Confirmation
    </Button>
  ) : null}
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

export default UserBookingList
