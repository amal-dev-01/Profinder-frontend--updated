import React, { useEffect, useState } from 'react'
import axiosInstance from '../../features/axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography,CardActions,Button ,Modal,TextField} from '@mui/material';


const UserConfirmation = () => {

    const{id}=useParams()
    const [booking,setBooking]=useState()
    const [complaintDescription, setComplaintDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const authToken = localStorage.getItem('authtoken');


    
    const BookingList = async (id) => {
        console.log(id);
        try {
          const response = await axiosInstance.get(`book/booking_details/${id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          console.log(response);
          if (response) {
            setBooking(response.data);
          } 
        } catch (error) {
          console.error(error);
        }
      };



      const handleCompletetion = async (bookingId, action) => {
        try {
          let requestData = {};  // Additional data for the request
      
          if (action === "Incompleted") {
            // Assuming `complaintDescription` is defined
            requestData = { description: complaintDescription };
          }
      
          const response = await axiosInstance.put(
            `book/booking_details/${bookingId}/${action}/`,
            requestData,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (response.status === 200) {
            console.log(`Booking ${action} successful`);
          } 
        } catch (error) {
          console.error(`Error ${action} booking:`, error);
        }
      };
      
      
      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
      
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      

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
      <Button size="small"  onClick={() => handleCompletetion(booking?.id,'confirm')} >Completed</Button>
      <Button size="small" onClick={handleOpenModal}>Report</Button>

<Modal open={isModalOpen} onClose={handleCloseModal}>
  <div>
    <Typography variant="h5" align="center" gutterBottom>
      Provide Details for Incompletion
    </Typography>

    <TextField
      label="Complaint Description"
      multiline
      rows={4}
      value={complaintDescription}
      onChange={(e) => setComplaintDescription(e.target.value)}
      fullWidth
      required
      margin="normal"
    />

    <Button variant="contained" color="primary" onClick={() => handleCompletetion(booking?.id, 'Incompleted')}>
      Submit
    </Button>
  </div>
</Modal>


    </CardActions>
    </Card>
      
    </div>
  )
}

export default UserConfirmation
