import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios";

import { jwtDecode } from 'jwt-decode';


const authToken = localStorage.getItem('authtoken');

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',

        },
      }
      const response = await axiosInstance.post(
       'token/',
        { email, password },
        config
      )
      const authtoken = response.data.access;
      localStorage.setItem('authtoken',authtoken)
      const userInfo = jwtDecode(authtoken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      return response.data;


    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        localStorage.removeItem('authtoken');
        localStorage.removeItem('userInfo');
          return {};
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  
  export const userProfile = createAsyncThunk(
    'auth/userprofile',
    async (_, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        };
  
        const response = await axiosInstance.get('userprofile/', config);  
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );


  export const userPost = createAsyncThunk(
    'auth/post',
    async (postId, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        };
  
        const response = await axiosInstance.get(`post/post/${postId}/update/`, config); 
   
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          console.log(error.response);
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const getUserProfile = createAsyncThunk(
    'auth/user',
    async (pk, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        };
  
        const response = await axiosInstance.get(`user_view/${pk}/`, config);
        console.log(response.data);  
   
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          console.log(error.response);
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const getUserPost = createAsyncThunk(
    'auth/userpost',
    async (pk, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        };
  
        const response = await axiosInstance.get(`user_post/${pk}/`, config);
        console.log(response.data);  
   
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          console.log(error.response);
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  // export const fetchNotifications = createAsyncThunk(
  //   'auth/notificationCount',
  //   async (_, { rejectWithValue }) => {
  //     try {
  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
  //         },
  //       };
  
  //     const response = await axiosInstance.get('book/notification/',config )
  //     console.log(response.data);  
   
  //       return response.data;
  //     } catch (error) {
  //       if (error.response && error.response.data.message) {
  //         console.log(error.response);
  //         return rejectWithValue(error.response.data.message);
  //       } else {
  //         return rejectWithValue(error.message);
  //       }
  //     }
  //   }
  // );

  // export const fetchNot = createAsyncThunk('auth/fetchNotifications', async (_, { rejectWithValue }) => {
  //   try {
  //     const connectPromise = new Promise((resolve, reject) => {
  //       const socket = new WebSocket(`ws://localhost:8000/ws/notify/?token=${authToken}&Content-Type=application/json`);
  
  //       socket.onopen = () => {
  //         console.log('WebSocket connected');
  //         resolve(socket);
  //       };
  
  //       socket.onerror = (error) => {
  //         reject(error);
  //       };
  //     });
  
  //     const socket = await connectPromise;
  
  //     // Now you can listen for messages or perform any other WebSocket-related tasks
  
  //     // This example logs messages received from the WebSocket
  //     socket.onmessage = (event) => {
  //       const notification = JSON.parse(event.data);
  //       console.log('Received notification:', notification);
  //     };
  //     return event.data;
  
  //   } catch (error) {
  //     if (error.response && error.response.data.message) {
  //       console.log(error.response);
  //       return rejectWithValue(error.response.data.message);
  //     } else {
  //       return rejectWithValue(error.message);
  //     }
  //   }
  // });
  


  // // export const fetchNotifications = (authToken) => async (dispatch) => {
  // //   try {
  // //     const response = await axiosInstance.get('book/notification/', {
  // //       headers: {
  // //         Authorization: `Bearer ${authToken}`,
  // //       },
  // //     });
  // //     return response.data;
  // //   } catch (error) {
  // //     console.error('Error fetching notifications:', error);
  // //   }
  // // };
  
