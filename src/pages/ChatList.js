import React, { useEffect, useState } from 'react';
import axiosInstance from '../features/axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar/Navbar';
import { Grid } from '@mui/material';

const ChatList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authtoken');

    const fetchChatRooms = async () => {
        try {
            const response = await axiosInstance.get('chat/proroom/', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.data) {
                setRooms(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (authToken) {
            fetchChatRooms();
        }
    }, [authToken]);

    const getOtherUsername = (roomName) => {
        const [user1, user2] = roomName.split('__');
        console.log(user1, user2);
        const requestedUser = authToken ? jwtDecode(authToken).username : null;
        return requestedUser === user1 ? user2 : user1;
      };
      

    return (
        <div>
            <Navbar/>
            <h2>Chat</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    {rooms && rooms.length > 0 ? (
                        rooms.map((room) => (
                            <div key={room.id}>
                                <Card
                                    sx={{ marginBottom: 2, maxWidth: 350 }}
                                    onClick={() => navigate(`/chatlist/chating/${room.name}`)}>
                                    <CardContent sx={{ textAlign: 'left' }}>
                                        <Typography>{getOtherUsername(room.name)}</Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <Typography>No bookings available.</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={8} >
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatList;
