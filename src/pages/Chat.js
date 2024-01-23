
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../features/axios";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

import './Chat.css'


function Chat() {
  const { roomName } = useParams();
  const WS_URL = `ws://localhost:8000/ws/chat/${roomName}/`;
  const CHAT_HISTORY_ENDPOINT = `/chat/chat_history/${roomName}/`;



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




  return (
    <div class="chat-container">
      <div class="chat-header">Chat</div>
      <div class="message-container" ref={messagesEndRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.username === username ? "sent" : "received"}`}
          >
            <div className="message-username">{message.username}:</div>
            <div className="message-content">{message.message}</div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleString()}
            </div>
            <div className="delete-button">
              {message.username === username && (
                <IconButton aria-label="delete" onClick={() => handleDelete(message.id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              )}
            </div>

          </div>

        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="message-form"  >
        <input
          type="text"
          className="input-box"
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <IconButton aria-label="send" type="submit">
          <SendIcon />
        </IconButton>

      </form>
    </div>

  );
}

export default Chat;

