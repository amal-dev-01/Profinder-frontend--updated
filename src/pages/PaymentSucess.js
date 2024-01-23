import React, { useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../features/axios';

const PaymentSuccess = () => {
  const authToken = localStorage.getItem('authtoken');  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    console.log(sessionId);

    const savePaymentDetails = async () => {
      try {
        const response = await axiosInstance.post('adminpanel/payment_success/',
            { session_id: sessionId },
    
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          }
        );

        console.log(response.data); 
      } catch (error) {
        console.error('Error updating payment details:', error);
      }
    };

    if (sessionId) {
      savePaymentDetails();
    }
  }, [authToken]); 
  return (
    <div>
      <p>Processing payment success...</p>
    </div>
  );
};

export default PaymentSuccess;
