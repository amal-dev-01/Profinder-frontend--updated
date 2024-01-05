import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios";

import { jwtDecode } from 'jwt-decode';

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



  
