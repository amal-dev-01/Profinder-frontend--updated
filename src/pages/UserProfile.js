// NotificationComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationComponent = () => {

  const authToken = localStorage.getItem('authtoken');
  const navigate = useNavigate()
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8000/ws/notify/?token=${authToken}&Content-Type=application/json`);
    
        
        setSocket(newSocket);
        newSocket.onopen = () => {
          console.log("WebSocket connected");
          fetchNotifications();
        }
        newSocket.onclose = () => console.log("WebSocket disconnected");
        
        return () => {
          newSocket.close();
        };
      }, []);
      
      useEffect(() => {
        if (!socket) return;
        
        const handleSocketMessage = (event) => {
          const notification = JSON.parse(event.data);
          setNotifications((prevNotifications) => [...prevNotifications, notification]);

        };

        socket.onmessage = handleSocketMessage;

        // return () => {
        //   socket.onmessage = null;
        // };
    }, [socket]);

    const fetchNotifications = async () => {
        try {
          const response = await axios.get('http://localhost:8000/book/notification/', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
                    setNotifications(response.data);

        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []); 

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                  <li key={index} onClick={() => navigate('/probookingaccept')}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
          // newSocket.addEventListener('open', (event) => {
          //   console.log('WebSocket connection opened:', event);
          // });
          
          // newSocket.addEventListener('message', (event) => {
          //   console.log('WebSocket message received:', event.data);
          // });
          
          // newSocket.addEventListener('close', (event) => {
          //   console.log('WebSocket connection closed:', event);
          // });
          
          // newSocket.addEventListener('error', (event) => {
          //   console.error('WebSocket error:', event);
          // });
