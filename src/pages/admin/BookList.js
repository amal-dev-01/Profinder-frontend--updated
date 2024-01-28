import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../features/axios';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [booking,setBooking]=useState([])
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authtoken')


    const Bookings = async () => {
        try {
            const response = await axiosInstance.get('adminpanel/booking_list/', {
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
        Bookings()
    }, [authToken])

  return (
    <div style={{width:'80%'}}>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {booking.map((book) => (
                    <Card key={book.id}  sx={{ marginBottom: 2  }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {/* <Avatar alt="User" src={user?.userprofile?.image} /> */}
                            </ListItemAvatar>
                            <ListItemText
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary">
                                                Professional Name: {book.professional_name}  
                                            </Typography>
                                               <Typography> User Name: {book.user_name}</Typography>
                                             

                                        <Typography>   Booking Date: {book.booking_date} </Typography>
                                        <Typography> Job: {book.job}</Typography>
                                        <Typography>Status: {book.status}</Typography> 


                                    </React.Fragment>
                                }
                            />
                            <Button onClick={()=>navigate(`/admin/booking/details/${book.id}`)}>View details</Button>
                        </ListItem>
                    </Card>
                ))}
            </List>
    </div>
  )
}

export default BookList

 