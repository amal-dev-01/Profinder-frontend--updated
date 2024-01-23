import React from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, CardActionArea, Box } from '@mui/material';
import Sidebar from '../Sidebar';
export default function ProfileView() {


    return (
        <div>
            <Sidebar></Sidebar>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                <Card sx={{ maxWidth: 900 }}>
                    <CardActionArea>
                        <div
                            style={{
                                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                                height: '250px',
                                backgroundSize: '100% 100%',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                padding: "10px",

                            }}>
                            <CardMedia
                                component="img"
                                src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
                                alt="Generic placeholder image"
                                className="mt-4 mb-2 img-thumbnail"
                                sx={{ marginLeft: 5 }}
                                style={{ width: '200px', height: "150px" }} />


                            <Typography sx={{ position: 'relative', textAlign: 'center', fontSize: '1.5em', width: '100%', bottom: '0', color: 'white' }}>
                                Jon Doe
                            </Typography>
                        </div>

                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                <div>
                                    <Typography>Posts</Typography>
                                    <Typography>5</Typography>
                                </div>
                                <div>
                                    <Typography>Followers</Typography>
                                    <Typography>12</Typography>
                                </div>
                                <div>
                                    <Typography>Followings</Typography>
                                    <Typography>15</Typography>
                                </div>
                            </div>
                            <Typography variant="body2" color="text.secondary" sx={{ width: 900, textAlign: "left" }} >
                                <div style={{ backgroundColor: "#f8f9fa", padding: "2%", textAlign: "left", alignItems: "center", marginRight: "3%" }}>
                                    <h4>About</h4>
                                    <div>
                                        <Typography>Name : Jon Doe </Typography>
                                        <Typography>Username: @jon</Typography>
                                        <Typography>Email: jhone@gmail.com</Typography>
                                        <Typography>Bio: "Let try"</Typography>
                                        <Typography>Address: Abc House kozhikode </Typography>
                                        <Typography>Ph: 812900158</Typography>
                                    </div>
                                    <div>
                                        <Button>Edit</Button>
                                        <Button>Post</Button>
                                    </div>
                                </div>
                            </Typography>
                            <Box sx={{ width: '100%', padding: 5 }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <img
                                            src="https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Your Image"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <img
                                            src="https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Your Image"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img
                                            src="https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Your Image"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}
