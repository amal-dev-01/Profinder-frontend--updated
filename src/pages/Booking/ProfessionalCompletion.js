import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography,CardActions,Button,TextField } from '@mui/material';
import axiosInstance from '../../features/axios';

const ProfessionalCompletion = () => {

 const [booking,setBooking]=useState()
 const [paymentAmount, setPaymentAmount] = useState('');

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



      const handleComplete = async ( bookingId) => {
        try {
          const response = await axiosInstance.patch(
            `book/complete_work/${bookingId}/`,
            { payment_amount: paymentAmount }, 
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (response.status === 200) {
            console.log('Jonb successfully');
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
            BookingList()
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
      <TextField
        label="Payment Amount"
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button size="small" onClick={() => handleComplete(book.id)}>
        Make Payment
      </Button>
      <CardActions>
      {/* <Button size="small" onClick={() => handleComplete(book.id)}>Completed</Button> */}
        {/* <Button size="small"  onClick={()=>{handleAccept('cancel')}} >Reject</Button> */}
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

export default ProfessionalCompletion
