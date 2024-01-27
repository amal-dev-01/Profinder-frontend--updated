import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios'

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
    <div>
              <ul>

        {pay.map((item, index) => (
          <li key={index}>
            <p>ID: {item.id}</p>
            <p>Month: {item.month}</p>
            <p>Year: {item.year}</p>
            <p>Amount: {item.amount}</p>
            <p>Total Amount: {item.total_amount}</p>
            <p>status: {item.status}</p>
            <p>stripe_id: {item.stripe_id}</p>


          </li>
        ))}
      </ul>

      
    </div>
  )
}

export default Payment
