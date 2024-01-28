import { logDOM } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../features/axios';
import { Typography, Button, Paper,styled } from '@mui/material';
// import { makeStyles } from '@mui/system';

const useStyles = styled((theme) => ({
  section: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'center',
  },
  paymentInfo: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const  CheckOut = () => {

  const authToken = localStorage.getItem('authtoken');
  const [pay, setPay] = useState();
  
  const handleDetails = async () => {
    try {
      const response = await axiosInstance.get(
        'adminpanel/payment/',
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response) {
        setPay(response.data);
        console.log('Payment details:', response.data);
      } else {
        console.error('Unexpected response content type:', response.headers['content-type']);
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        'adminpanel/payment/',
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response) {
        console.log(response.data.url);
        window.location.href = response.data.url;  
        console.log('Payment details:', response.data);
      } else {
        console.error('Unexpected response content type');
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };
  
  

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
    
        if (query.get('success')) {         
          console.log('sucess');
     }
    
        if (query.get('canceled')) {
          console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
        handleDetails()
      }, []);
      const classes = useStyles();  // Ensure you are initializing the classes variable here

  return (
    <div>
{/*         
    <section>
    
      <h3>Payment Details</h3> 
      <p>{pay &&pay.amount}</p> 
      <p>{pay &&pay.month} - {pay &&pay.year}</p> 
      <p>{pay &&pay.status}</p> 
      <p>{pay &&pay.professional}</p> 
      <p>{pay &&pay.total_amount}</p>
      <p>{pay &&pay.id}</p> 

      <form onSubmit={handleSubmit} >
      <button type="submit">
        Checkout
      </button>
    </form>

    </section> */}
    <div style={{padding:"10%"}}>

    <Paper className={classes.section} style={{padding:"10%"}}>
      <Typography variant="h5">Payment Details</Typography>
      <div className={classes.paymentInfo}>
        <Typography>Amount: {pay && pay.amount}</Typography>
        <Typography>
          Date: {pay && pay.month} - {pay && pay.year}
        </Typography>
        <Typography>Status: {pay && pay.status}</Typography>
        <Typography>Professional: {pay && pay.professional}</Typography>
        <Typography>Total Amount: {pay && pay.total_amount}</Typography>
        <Typography>Payment ID: {pay && pay.id}</Typography>
      </div>
      {pay && pay.status == 'completed' ? <Typography>You are already pay</Typography> : (
  <form onSubmit={handleSubmit}>
    <Button type="submit" variant="contained" color="primary">
      Checkout
    </Button>
  </form>
)}

    </Paper>
    </div>


    </div>
  )
}

export default CheckOut

  