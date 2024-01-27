import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../features/axios';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ListUser = () => {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const authToken = localStorage.getItem('authtoken')

    const UsersList = async () => {
        try {
            const response = await axiosInstance.get('adminpanel/users/', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        UsersList()
    }, [authToken])

    return (
        <div>

            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', padding:'10px' }}>
                {users.map((user, index) => (
                    <Card key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={user?.userprofile?.image} />
                            </ListItemAvatar>
                            <ListItemText
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary">
                                            Name :{user.first_name} {user.last_name}</Typography>


                                        <Typography>Username :{user.username} </Typography>
                                        <Typography> Active:{user.is_active}</Typography>
                                        <Typography>Phone : {user.phone}</Typography>


                                    </React.Fragment>
                                }
                            />
                            <Button onClick={()=>navigate(`/admin/profile/${user.id}`)}>View profile</Button>

                        </ListItem>
                    </Card>
                ))}
            </List>





        </div>
    )
}

export default ListUser
