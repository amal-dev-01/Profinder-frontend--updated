import { logDOM } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../features/axios';

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
  return (
    <div>
        
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

    </section>

    </div>
  )
}

export default CheckOut

  