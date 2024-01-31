import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import {   getUserPost, getUserProfile, login, logout, userPost, userProfile } from './authAction'

const authtoken = localStorage.getItem('authtoken')
  ? localStorage.getItem('authtoken')
  : null

  const userInfo = localStorage.getItem('authtoken')
  ? jwtDecode(localStorage.getItem('authtoken'))
  : null
  

const initialState = {
  loading: false,
  userInfo,
  authtoken,
  error: null,
  success: false,
  userProfile:null,
  userPost :null,
  getUser:null,
  getPost:null,
  notificationCount:null,
  notification:[],
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    // userLogin

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.authtoken = payload.authtoken;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })


      //  userLOGUT
      .addCase(logout.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.authtoken = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

     // userProfile
     .addCase(userProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(userProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userProfile = payload;
    })
    .addCase(userProfile.rejected, (state, { payload }) => {
      state.loading= false;
      state.error = payload;
    })

    // userPopst

    .addCase(userPost.pending, (state) => {
      state.loading = true;
      state.error = null; 
      state.userPost = null;
    })
    .addCase(userPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userPost = payload;
    })
    .addCase(userPost.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })


    .addCase(getUserProfile.pending, (state) => {
      console.log('getUserProfile pending');

      state.loading = true;
    })
    .addCase(getUserProfile.fulfilled, (state, { payload }) => {
      console.log('getUserProfile fulfilled', payload);
      state.loading = false;
      state.getUser = payload;
    })
    .addCase(getUserProfile.rejected, (state, { payload }) => {
      console.log('getUserProfile rejected', payload);
      state.loading= false;
      state.error = payload;
    })


    .addCase(getUserPost.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUserPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getPost = payload;
    })
    .addCase(getUserPost.rejected, (state, { payload }) => {
      state.loading= false;
      state.error = payload;
    })

    // .addCase(fetchNotifications.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   console.log('kkkkkkkkkkkkkkkkkkk',payload);
    //   state.notificationCount = payload;
    // })
    // .addCase(fetchNotifications.rejected, (state, { payload }) => {
    //   state.loading= false;
    //   state.error = payload;
    // })

    // .addCase(fetchNot.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(fetchNot.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.notification = payload;
    //   console.log('kkkkkkkkkkkkkkkkkkk',payload);
    //   state.notificationCount = payload;
    // })
    // .addCase(fetchNotifications.rejected, (state, { payload }) => {
    //   state.loading= false;
    //   state.error = payload;
    // })


    
  },

})
export default authSlice.reducer
export const selectAuthToken = (state) => state.user.authtoken;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserPost= (state) => state.user.userPost;




