import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography,CardActions,Button } from '@mui/material';
import Sidebar from '../Sidebar';

export const BookDetails = () => {

    const {id}=useParams()
    const authToken = localStorage.getItem('authtoken')

    const [booking,setBooking]=useState([])

    
    const booking_detail = async () => {
        try {
            const response = await axiosInstance.get(`adminpanel/booking_details/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            setBooking(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        booking_detail(id)
    }, [authToken,])



  return (
     <div  style={{width:'80%',display:'flex',justifyContent:'center'}}>
      <Sidebar/>
  {
      <div key={booking.id}>
        <Card style={{width:'100%'}} >
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography>User: {booking.user_name}</Typography>
            <Typography>Address: {booking.address}</Typography>
            <Typography>Date: {booking.booking_date}</Typography>
            <Typography>Is_paid: {booking.is_paid}</Typography>
            <Typography>Status: {booking.status}</Typography>
            <Typography>Job: {booking.job}</Typography>
          </CardContent>
        </Card>
      </div>


  }
</div>



  )
}
