import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifySocket = new WebSocket('ws://localhost:8000/ws/notify/');

    notifySocket.onopen = () => {
      console.log('Socket successfully connected.');
    };

    notifySocket.onclose = () => {
      console.log('Socket closed unexpectedly');
    };

    // notifySocket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    // };
  //   notifySocket.onmessage = function (event) {
  //     const data = JSON.parse(event.data);
  //     const message = data.message;
  //     console.log('hi',data);
  //     setNotifications((prevNotifications) => [...prevNotifications, data.message]);
  // };
  notifySocket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log('Received WebSocket message:', data);
    const message = data.message;
    console.log("kkkkkkkkkkkk");
    console.log('mdals',message);

    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };
  

  
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Notify</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
