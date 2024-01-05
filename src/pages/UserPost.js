// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import axiosInstance from '../features/axios';
// import { baseURL } from '../features/baseUrl';

// const UserPost = () => {
//     const authToken = localStorage.getItem('authtoken');
//     const [posts,setPosts]= useState([])

//     const fetchPost = async () => {
//         try {
//             const response = await axiosInstance.get('post/post/', {
//                 headers: {
//                       'Authorization': `Bearer ${authToken}`,
//                       'Content-Type': 'multipart/form-data',
//                 },
//             });
//             if (response.status == 200) {
        
//                 setPosts(response.data)
//             }

//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };
//     useEffect(()=>{
//         if(authToken){
//             fetchPost()
//         }

//     },[authToken]

//     )
//     console.log(posts);


//     return (
//         <div>
//         <h1>Post</h1>
        // {posts.map((post) => (
        //     <div key={post.id}>
        //         <div>{post.title}</div>
        //         <div>{post.comments[0].text}</div>
        //         <div>{post.total_likes}</div>
        //         <div>{post.created_at}</div>
                
        //             <div style={{width :"200px",height:"500px"}}>
        //             <img src={`${baseURL}/${post.post}`} alt="Post Image" />
        //             </div>


        //         </div>
        // ))}
//     </div>

//     )
// }

// export default UserPost
import React from 'react';
import { Container, Grid, Card, CardHeader, CardContent, CardActions, Button, Typography, Avatar, Badge } from '@mui/material';
import { styled } from '@mui/system';

const GradientContainer = styled(Container)({
  background: 'linear-gradient(to right, #9de2ff, #ffffff)',
  padding: '5rem 0',
});

const ProfileCard = () => {
  return (
    <GradientContainer>
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item lg={9} xl={7}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Profile Image" />
                }
                title="Andy Horwitz"
                subheader="New York"
              />
              <CardContent>
                <div style={{ background: '#f8f9fa', padding: '1rem' }}>
                  <Typography variant="body1" className="font-italic mb-1">Web Developer</Typography>
                  <Typography variant="body1" className="font-italic mb-1">Lives in New York</Typography>
                  <Typography variant="body1" className="font-italic mb-0">Photographer</Typography>
                </div>
              </CardContent>
              <CardContent className="text-black p-4">
                <div className="mb-5">
                  <Typography variant="h6" className="fw-normal mb-1">About</Typography>
                  <div style={{ background: '#f8f9fa', padding: '1rem' }}>
                    <Typography variant="body1" className="font-italic mb-1">Web Developer</Typography>
                    <Typography variant="body1" className="font-italic mb-1">Lives in New York</Typography>
                    <Typography variant="body1" className="font-italic mb-0">Photographer</Typography>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Typography variant="h6" className="fw-normal mb-0">Recent photos</Typography>
                  <Typography variant="body1" className="mb-0"><a href="#!" className="text-muted">Show all</a></Typography>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="image 1" className="w-100 rounded-3" />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" alt="image 2" className="w-100 rounded-3" />
                  </Grid>
                  {/* Add more recent photos as needed */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </GradientContainer>
  );
}

export default ProfileCard;
