import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../features/axios';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import { jwtDecode } from 'jwt-decode';


const ChatArea = () => {
  const authToken = localStorage.getItem('authtoken');
  const user = authToken ? jwtDecode(authToken).username : null;
  // console.log(user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userList = async () => {
    try {
      const response = await axiosInstance.get('chat/chat/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // console.log(response);
      setUsers(response.data);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    if (authToken) {
      userList();
    }
  }, [authToken]);

  function createConversationName(other) {
    const namesAlph = [other.username, 'your-username'].sort();
    const roomName = `${namesAlph[0]}__${user}`;
    console.log(roomName);
    return roomName;
  }
  

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading &&
        users
          .filter((u) => u.username !== user)
          .map((other) => (
            <Link key={other.id} to={`/chating/${createConversationName(other)}`}>
              <div>{other.username}</div>
            </Link>
          ))}
    </div>
  );
};

export default ChatArea;
