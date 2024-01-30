
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../features/axios";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Grid, IconButton, Card, CardContent, Typography,useMediaQuery, useTheme } from '@mui/material';
// import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';

import './Chat.css'


function Chat() {
  const { roomName } = useParams();
  const WS_URL = `ws://localhost:8000/ws/chat/${roomName}/`;
  const CHAT_HISTORY_ENDPOINT = `/chat/chat_history/${roomName}/`;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);




  const fetchChatHistory = async () => {
    try {
      const response = await axiosInstance.get(CHAT_HISTORY_ENDPOINT);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };



  useEffect(() => {
    const authToken = localStorage.getItem('authtoken');
    const user = authToken ? jwtDecode(authToken) : null;
    const storedUsername = user?.username;

    const initializeUsername = () => {
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        const input = prompt("Enter your username:");
        if (input) {
          setUsername(input);
          localStorage.setItem("username", input);
        }
      }
    };

    initializeUsername();

    const newSocket = new WebSocket(WS_URL);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      fetchChatHistory();
    }
    newSocket.onclose = () => console.log("WebSocket disconnected");
    newSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };



    return () => {
      newSocket.close();
    };
  }, [username, roomName]);

  useEffect(() => {
    if (socket) {
      const handleWebSocketMessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.onmessage = handleWebSocketMessage;

      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: username,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  const handleDelete = async (messageId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this message?");

    if (shouldDelete) {
      try {
        await axiosInstance.delete(`/chat/delete_message/${messageId}/`);
        fetchChatHistory()
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };


  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  }, [messages]);

  const getOtherUsername = (roomName) => {
    const [user1, user2] = roomName.split('__');
    const authToken = localStorage.getItem('authtoken')
    const requestedUser = authToken ? jwtDecode(authToken).username : null;
    return requestedUser === user1 ? user2 : user1;
  };



  return (

    <div>
      <Grid container justify="center" alignItems="center">
        <Card className="chat-card">
          <div><Card
            sx={{ marginBottom: 2 }}>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography>{getOtherUsername(roomName)}</Typography>
            </CardContent>
          </Card></div>
          <div className="messages-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  width: isSmallScreen ? '80%' : '25%',
                  margin: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: message.username === username ? '#e1ffc7' : '#f0f0f0',
                  alignSelf: message.username === username ? 'flex-end' : 'flex-start',
                  textAlign: 'left',
                }}>
                <div className="message-username">{message.username}</div>
                <div>{message.message}</div>
                <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()} {message.username === username && (
                  <IconButton aria-label="delete" onClick={() => handleDelete(message.id)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                )}</div>
                <div>

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <IconButton aria-label="send" type="submit">
              <SendIcon />
            </IconButton>
          </form>
        </Card>
      </Grid>
    </div>

  );
}

export default Chat;


// import React from "react";
// import './Chat.css';

// const MemberCard = ({ name, message, time, avatarSrc, unreadCount }) => (
//   <li className="p-2 border-bottom" style={{ borderBottom: '1px solid rgba(255,255,255,.3) !important' }}>
//     <a href="#!" className="d-flex justify-content-between link-light">
//       <div className="d-flex flex-row">
//         <img src={avatarSrc} alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
//         <div className="pt-1">
//           <p className="fw-bold mb-0">{name}</p>
//           <p className="small text-white">{message}</p>
//         </div>
//       </div>
//       <div className="pt-1">
//         <p className="small text-white mb-1">{time}</p>
//         {unreadCount > 0 && <span className="badge bg-danger float-end">{unreadCount}</span>}
//       </div>
//     </a>
//   </li>
// );

// const MessageCard = ({ name, time, message, avatarSrc }) => (
//   <li className="d-flex justify-content-between mb-4">
//     <img src={avatarSrc} alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
//     <div className="card mask-custom">
//       <div className="card-header d-flex justify-content-between p-3" style={{ borderBottom: '1px solid rgba(255,255,255,.3)' }}>
//         <p className="fw-bold mb-0">{name}</p>
//         <p className="text-light small mb-0"><i className="far fa-clock"></i> {time}</p>
//       </div>
//       <div className="card-body">
//         <p className="mb-0">{message}</p>
//       </div>
//     </div>
//   </li>
// );

// function Chat() {
//   return (
//     <div>
//       <section className="gradient-custom">
//         <div className="container py-5">
//           <div className="row">
//             {/* Member List */}
//             <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
//               <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>
//               <div className="card mask-custom">
//                 <div className="card-body">
//                   <ul className="list-unstyled mb-0">
//                     <MemberCard name="John Doe" message="Hello, Are you there?" time="Just now" avatarSrc="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" unreadCount={1} />
//                     {/* Add more member cards as needed */}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Message List */}
//             <div className="col-md-6 col-lg-7 col-xl-7">
//               <ul className="list-unstyled text-white">
//                 <MessageCard name="Brad Pitt" time="12 mins ago" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." avatarSrc="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" />
               
//               </ul>

              
//               <li className="mb-3">
           
//               </li>
//             </div>
//           </div>
//         </div>
//         <div className="form-outline form-white">
//                   <textarea className="form-control" id="textAreaExample3" rows="4"></textarea>
//                   <label className="form-label" htmlFor="textAreaExample3">Message</label>
//               <button type="button" className="btn btn-light btn-lg btn-rounded float-end">Send</button>
//                 </div>
//       </section>
//     </div>
//   );
// }

// export default Chat;


