import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios'
import { Card,Typography } from '@mui/material'

const Payment = () => {
    const authToken = localStorage.getItem('authtoken')   
    const [pay,setPay] = useState([]) 
    const booking_detail = async () => {
        try {
            const response = await axiosInstance.get('adminpanel/payment_details/', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            setPay(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        booking_detail()
    }, [authToken,])



  return (
    <div style={{width:'80%'}}>
              <ul>

        {pay.map((item, index) => (
          <Card key={index} sx={{marginBottom:3,textAlign:'left',padding:'10px'}}>
            <div style={{padding:'2%'}}>
            <Typography>ID: {item.id}</Typography>
            <Typography>Month: {item.month}</Typography>
            <Typography>Year: {item.year}</Typography>
            <Typography>Amount: {item.amount}</Typography>
            <Typography>Total Amount: {item.total_amount}</Typography>
            <Typography>status: {item.status}</Typography>
            <Typography>stripe_id: {item.stripe_id}</Typography>
            </div>

          </Card>
        ))}
      </ul>

      
    </div>
  )
}

export default Payment
