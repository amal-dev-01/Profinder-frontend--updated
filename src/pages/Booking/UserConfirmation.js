import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography,CardActions,Button } from '@mui/material';


const UserConfirmation = () => {
    const{id}=useParams()
    const [booking,setBooking]=useState()
    const authToken = localStorage.getItem('authtoken');


    
    const BookingList = async (id) => {
        try {
          const response = await axiosInstance.get(`book/booking_details/${id}`, {
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

    //   const handleCompletetion =async(bookingId,action)=>{
    //     console.log(bookingId,action);
    //     try {
    //         const response = await axiosInstance.put(
    //           `book/booking_details/${bookingId}/${action}/`,
    //           {}, 
    //           {
    //             headers: {
    //               Authorization: `Bearer ${authToken}`,
    //               'Content-Type': 'application/json',
    //             },
    //           }
    //         );
        
    //         if (response.status === 200) {
    //           console.log('Booking accepted successfully');
    //         } else {
    //           console.error('Failed to accept booking:', response.data);
    //         }
    //       } catch (error) {
    //         console.error('Error accepting booking:', error);
    //       }
    //     };

      

      useEffect(() => {
        if (authToken) {
            BookingList(id)
        }
      }, [authToken]);
    
    
  return (
    <div>
        <Card sx={{ maxWidth: 345 }}>
        <CardContent sx={{ textAlign: 'left' }}>
  <Typography>Professional: {booking?.professional_name}</Typography>
  <Typography>User: {booking?.user_name}</Typography>
  <Typography variant="body2" color="text.secondary">
    <Typography>Address: {booking?.address}</Typography>
    <Typography>Date: {booking?.booking_date}</Typography>
    <Typography>Is_paid: {Boolean(booking?.is_paid).toString()}</Typography>
    <Typography>Status: {booking?.status}</Typography>
    <Typography>Job: {booking?.job}</Typography>
    <Typography>Amount: {booking?.price}</Typography>
  </Typography>
</CardContent>

      <CardActions>
      {/* <Button size="small"  onClick={() => handleCompletetion(booking?.id,'confirm')} >Completed</Button>
      <Button size="small" >Report</Button> */}


    </CardActions>
    </Card>
      
    </div>
  )
}

export default UserConfirmation
