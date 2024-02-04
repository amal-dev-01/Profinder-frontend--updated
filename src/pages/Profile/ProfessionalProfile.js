import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, CardActionArea, Box } from '@mui/material';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserProfile } from '../../features/authSlice';
import axiosInstance from '../../features/axios';
import { userProfile } from '../../features/authAction';
import { baseURL } from '../../features/baseUrl';
import PostAddIcon from '@mui/icons-material/PostAdd';
export default function ProfileView() {
    const navigate = useNavigate();
    const userProfileData = useSelector(selectUserProfile);
    const authToken = localStorage.getItem('authtoken');
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([])

    const postList = async () => {
        try {
            const response = await axiosInstance.get('post/post/', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status == 200) {

                setPosts(response.data)
            }

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        if (authToken) {
            dispatch(userProfile());
            postList()
        }
    }, [authToken, dispatch]);

    console.log(userProfileData);

    return (
        <div>
            <Sidebar></Sidebar>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                <Card sx={{ maxWidth: 900 }}>
                    {userProfileData?.userprofile && (

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
                                    src={`${baseURL}${userProfileData.userprofile.image}`}
                                    alt="user image"
                                    className="mt-4 mb-2 img-thumbnail"
                                    sx={{ marginLeft: 5 }}
                                    style={{ width: '200px', height: "150px" }} />


                                <Typography sx={{ position: 'relative', textAlign: 'center', fontSize: '1.5em', width: '100%', bottom: '0', color: 'white' }}>
                                    {userProfileData.first_name} {userProfileData.last_name}
                                </Typography>
                            </div>

                            <CardContent>
                                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                    <div>
                                        <Typography>Posts</Typography>
                                        <Typography>{posts.length}</Typography>
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
                                            <Typography>Name :  {userProfileData.first_name} {userProfileData.last_name} </Typography>
                                            <Typography>Username :   {userProfileData.username}</Typography>
                                            <Typography>Email :  {userProfileData.email}</Typography>
                                            {/* <Typography>Bio :   "{userProfileData.bio}"</Typography> */}
                                            <Typography>Address :   {userProfileData.userprofile.address} </Typography>
                                            <Typography>Phone :     {userProfileData.phone}</Typography>
                                        </div>
                                        <div>
                                            <Button onClick={() => navigate('/editprofile')}>Edit</Button>
                                            <Button onClick={() => navigate('/addpost')}>Post</Button>
                                        </div>
                                    </div>
                                </Typography>
                                <Box sx={{ width: '100%', padding: 5 }}>
                                    {posts.map((post) => (
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item xs={6}>
                                                <img
                                                    src={`${baseURL}${post.post}`}
                                                    alt="posted images"
                                                    onClick={() => navigate(`/postview/${post.id}`)}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    )}
                </Card>
            </div>
        </div>
    );
}
