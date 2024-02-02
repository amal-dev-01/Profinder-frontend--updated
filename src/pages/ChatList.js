import React, { useEffect, useState } from 'react';
import axiosInstance from '../features/axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar/Navbar';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBInputGroup,
    // MDBScrollbar,
  } from "mdb-react-ui-kit";

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
                console.log(response.data);
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
            {/* <Navbar/>
            <h2>Chat</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    {rooms && rooms.length > 0 ? (
                        rooms.map((room) => (
                            <div key={room.id}>
                                <Card
                                    sx={{ marginBottom: 2, maxWidth: 350 }}
                                    // onClick={() => navigate(`/chatlist/chating/${room.name}`)}>
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
            </Grid> */}
                <MDBContainer fluid className="py-5" style={{ backgroundColor: "#CDC4F9" }}>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <MDBInputGroup className="rounded mb-3">
                    
                      <span
                        className="input-group-text border-0">
                        <IconButton onClick={()=>navigate('/home')}>
                            
                        <ArrowBackIosIcon/>
                        </IconButton>
                      </span>
                    </MDBInputGroup>
                    <MDBTypography listUnStyled className="mb-0">
                    {rooms && rooms.length > 0 ? (
                        rooms.map((room) => (
                            <div key={room.id}>
                        <li className="p-2 border-bottom">
                          <div
                            onClick={() => navigate(`/chatlist/chating/${room.name}`)}
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  src="https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png"
                                  alt="avatar"
                                  className="d-flex align-self-center me-3"
                                  width="60"
                                />
                                <span className="badge bg-success badge-dot"></span>
                              </div>
                              <div className="pt-1" onClick={() => navigate(`/chatlist/chating/${room.name}`)}>
                                <p className="fw-bold mb-0">{getOtherUsername(room.name)}</p>
                                <p className="small text-muted">
                                  Hello, Are you there?
                                </p>
                              </div>
                            </div>
                           
                          </div>
                        </li>
                        </div>
                        ))
                    ) : (
                        <MDBTypography>No bookings available.</MDBTypography>
                    )}

                        </MDBTypography>
                    
</div>
</MDBCol>

<MDBCol md="6" lg="7" xl="8">
    <Outlet/>
</MDBCol>
</MDBRow>
</MDBCardBody>
</MDBCard>
</MDBCol>
</MDBRow>
</MDBContainer>


        </div>
    );
};

export default ChatList;
