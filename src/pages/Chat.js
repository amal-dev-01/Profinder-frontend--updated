
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../features/axios";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Grid, IconButton, Card, CardContent, Typography, useMediaQuery, useTheme, Avatar } from '@mui/material';
import {
  MDBCol,
  
} from "mdb-react-ui-kit";
import './Chat.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



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
  const navigate = useNavigate()




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
      <MDBCol>
        <CardContent sx={{ textAlign: 'left' }}>
        <span
                        className="input-group-text border-0">
                        <IconButton onClick={()=>navigate('/chatlist')}>
                            
                        <ArrowBackIosIcon/>
                        </IconButton>{getOtherUsername(roomName)}
                      </span>
        </CardContent>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex flex-row justify-content-${message.username === username ? 'end' : 'start'}`}>
              {message.username !== username && (
               
                <Avatar sx={{backgroundColor:"red"}}>{message.username[0].toUpperCase()}</Avatar>

              )}
              <div>
                <p
                  className={`small p-2 ${message.username === username ? 'me-3 text-white rounded-3 bg-primary' : 'ms-3 mb-1 rounded-3'}`}
                >
                  {message.message}
                </p>
                <p className={`small ${message.username === username ? 'me-3' : 'ms-3'} mb-3 rounded-3 text-muted float-${message.username === username ? 'end' : 'start'}`}>
                  {new Date(message.timestamp).toLocaleString()}
                  {message.username === username && (
                    <IconButton aria-label="delete" onClick={() => handleDelete(message.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  )}
                </p>
              </div>
              {message.username === username && (
                               <Avatar>{message.username[0].toUpperCase()}</Avatar>

              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">


            <input
              type="text"
              className="form-control form-control-lg"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type message"
            />
            <IconButton aria-label="send" type="submit">
              <SendIcon />
            </IconButton>

          </div>
        </form>

      </MDBCol>

      {/* <Grid container justify="center" alignItems="center">
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
      </Grid> */}
    </div>

  );
}

export default Chat;

