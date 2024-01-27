import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Card, CardContent, Typography,CardActions,Button } from '@mui/material';

const FilterBooking = () => {
    const authToken = localStorage.getItem('authtoken')

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState();


    
  const handleChange = (event) => {
    setAction(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {

        try {
            const response = await axiosInstance.get(`adminpanel/booking_filter/${action}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            console.log(response.data);
            setBookings(response.data);
            setLoading(false);

        } catch (error) {
            console.error(error)
            setLoading(false);

        }
    }

     

    fetchData(action);
  }, [action]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h2>Bookings</h2>

    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Action</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={action}
    label="action"
    onChange={handleChange}
  >
    <MenuItem value={'canceled'}>Canceled</MenuItem>
    <MenuItem value={'confirmed'}>Confirmed</MenuItem>
    <MenuItem value={'completed'}>Completed</MenuItem>
    <MenuItem value={'Incompleted'}>Incompleted</MenuItem>
    <MenuItem value={'pending'}>pending</MenuItem>



  </Select>
</FormControl>
{bookings.length > 0 ? (
  bookings.map((booking) => (
    <Card key={booking.id} sx={{ maxWidth: 345 }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography>User: {booking.user_name}</Typography>
        <Typography>Date: {booking.booking_date}</Typography>
        <Typography>Is_paid: {booking.is_paid}</Typography>
        <Typography>Status: {booking.status}</Typography>
        <Typography>Job: {booking.job}</Typography>
      </CardContent>
    </Card>
  ))
) : (
  <p>No bookings available.</p>
)}

    </div>
  )
}

export default FilterBooking
