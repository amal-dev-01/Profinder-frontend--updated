import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../features/axios';
import { getUserProfile } from '../../features/authAction';
import { baseURL } from '../../features/baseUrl';
import Navbar from '../Navbar/Navbar';

export default function UserView() {

    const navigate = useNavigate();
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.user.getUser);

    const authToken = localStorage.getItem('authtoken');
    console.log(authToken);
    const dispatch = useDispatch();

    const postList = async (pk) => {
        try {
            const response = await axiosInstance.get(`user_post/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response) {
                setPosts(response.data)
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    console.log(posts);



    useEffect(() => {
        if (authToken) {
            dispatch(getUserProfile(id));
            postList(id)
        }
    }, [authToken, dispatch, id]);
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
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
                                src={
                                    user.userprofile?.image
                                        ? `${baseURL}${user.userprofile.image}`
                                        : user.professionalprofile?.image
                                            ? `${baseURL}${user.professionalprofile.image}`
                                            : ''
                                }
                                alt="user image"
                                className="mt-4 mb-2 img-thumbnail"
                                sx={{ marginLeft: 5 }}
                                style={{ width: '200px', height: "150px" }} />


                            <Typography sx={{ position: 'relative', textAlign: 'center', fontSize: '1.5em', width: '100%', bottom: '0', color: 'white' }}>
                                {user.first_name} {user.last_name}
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
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 900, textAlign: "left" }} >
                                <div style={{ backgroundColor: "#f8f9fa", padding: "2%", textAlign: "left", alignItems: "center", marginRight: "3%" }}>
                                    <h4>About</h4>
                                    <div>
                                        <div>
                                            {user.first_name && (
                                                <Typography>Name: {user.first_name}  {user.last_name}</Typography>
                                            )}
                                            {user.username && (
                                                <Typography>Username: {user.username}  {user.last_name}</Typography>
                                            )}
                                            <Typography>Email: {user.email}</Typography>

                                            {user.userprofile ? (
                                                <>
                                                    {user.userprofile.bio && (
                                                        <Typography>Bio: "{user.userprofile.bio}"</Typography>
                                                    )}
                                                    {user.userprofile.address && (
                                                        <Typography>Address: {user.userprofile.address}</Typography>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {user.professionalprofile && (
                                                        <>
                                                            {user.professionalprofile.job && (
                                                                <Typography>Job: {user.professionalprofile.job}</Typography>
                                                            )}
                                                            {user.professionalprofile.experience && (
                                                                <Typography>Experience: {user.professionalprofile.experience}</Typography>
                                                            )}
                                                            {user.professionalprofile.skills && (
                                                                <Typography>Skills: {user.professionalprofile.skills}</Typography>
                                                            )}
                                                            {user.professionalprofile.bio && (
                                                                <Typography>Bio: {user.professionalprofile.bio}</Typography>
                                                            )}
                                                            {user.professionalprofile.address && (
                                                                <Typography>Address: {user.professionalprofile.address}</Typography>
                                                            )}
                                                        </>

                                                    )}
                                                </>
                                            )}

                                            {user.phone && (
                                                <Typography>Phone: {user.phone}</Typography>
                                            )}
                                        </div>

                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                        <div>
                                            <Button onClick={() => navigate()}>Follow</Button>
                                            <Button onClick={() => navigate(`/chatlist/chat/${user.username}`)}>Chat</Button>
                                        </div>
                                        <div>
                                        {user.professionalprofile ? (
                                        <>
                                            <Button onClick={() => navigate(`/booking/${id}/${user.username}`)}>Book</Button>
                                        </>
                                    ) : null}
                                 </div>
                                    </div>
                                </div>
                            </Typography>
                            <Box sx={{ width: '100%', padding: 2 }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {posts.map((post) => (
                                        <Grid item xs={6} key={post.id}>
                                            <img
                                                src={`${baseURL}${post.post}`}
                                                alt="posted images"
                                                onClick={() => navigate(`/postdetails/${post.id}`)}
                                                style={{ width: '100%', height: '70%', objectFit: 'cover' }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box> 
                         </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}
