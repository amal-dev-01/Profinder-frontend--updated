import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, Typography, createTheme, ThemeProvider ,Card,CardContent} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

const theme = createTheme(); // Creating a theme instance

const useStyles = makeStyles(() => ({
  notificationCard: {
    minWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  notificationItem: {
    cursor: 'pointer',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Notification = () => {

  const authToken = localStorage.getItem('authtoken');
  const navigate = useNavigate()
    const [notifications, setNotifications] = useState([]);
    const classes = useStyles();
    
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
        //     socket.onmessage = null;
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

    const handleNotificationClick = ()=>{
      navigate('/probookingaccept')
    }

    return (
      <div>
    <ThemeProvider theme={theme}>
          <Typography variant="h6" align="center" gutterBottom>
            Notifications
          </Typography>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index} className={classes.notificationItem} onClick={handleNotificationClick}>
                <Card className={classes.notificationCard}>
                <CardContent>
                {notification.message}
            </CardContent>
            </Card>
              </ListItem>
            ))}
          </List>
    </ThemeProvider>
    </div>

    );
};

export default Notification;