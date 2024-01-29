import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../features/axios';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import { jwtDecode } from 'jwt-decode';


const ChatArea = () => {
  const authToken = localStorage.getItem('authtoken');
  const {username} = useParams()
  const user = authToken ? jwtDecode(authToken).username : null;
  const navigate = useNavigate()
  useEffect(() => {
    if (authToken) {
      const roomName = createConversationName(username);

      navigate(`/chatlist/chating/${roomName}`)
    }
  }, [authToken, username, navigate]);


  function createConversationName(username) {
    const namesAlph = [username, 'your-username'].sort();
    const roomName = `${namesAlph[0]}__${user}`;
    console.log(roomName);
    
    return roomName;
  }

  return (
    <div>
     
    </div>
  );
};

export default ChatArea;
