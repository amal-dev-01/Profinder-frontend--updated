import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CircularProgress, Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../features/axios';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, CardHeader } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  const [professional, setProfessional] = useState([]);
  const [users, setUsers] = useState([]);

  const authToken = localStorage.getItem('authtoken');

  const professionalList = async () => {
    try {
      const response = await axiosInstance.get('adminpanel/professionals/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProfessional(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const userList = async () => {
    try {
      const response = await axiosInstance.get('adminpanel/users/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    professionalList();
    userList();
  }, [authToken]);

  return (
    <div>
      <Sidebar />

      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} sm={8} style={{ padding: '20px' }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center', marginTop: 2 }}>
            {/* Your existing cards go here */}
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4 }}>
            <Typography>Recent Registered Professionals</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {professional.map((pro) => (
                    <TableRow key={pro.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {pro.first_name} {pro.last_name}
                      </TableCell>
                      <TableCell align="right">{pro.username}</TableCell>
                      <TableCell align="right">{pro.phone}</TableCell>
                      <TableCell align="right">{pro.is_active}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4}}>
            <Typography>Recent Registered Users</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((pro) => (
                    <TableRow key={pro.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {pro.first_name} {pro.last_name}
                      </TableCell>
                      <TableCell align="right">{pro.username}</TableCell>
                      <TableCell align="right">{pro.phone}</TableCell>
                      <TableCell align="right">{pro.is_active}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} sm={4} style={{ padding: '20px' }}>
          <Card sx={{ maxWidth: 400, marginBottom: 4 }}>
            {/* Your existing card content */}
          </Card>

          <BarChart
            colors={['#EFEA5A', '#16DB93', '#F29E4C']}
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={500}
            height={300}
          />

          <PieChart
            colors={['#EFEA5A', '#16DB93', '#F29E4C']}
            series={[
              {
                data: [
                  { id: 0, value: 30, label: 'Pending A' },
                  { id: 1, value: 15, label: 'Completed B' },
                  { id: 2, value: 5, label: 'Cancelled C' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
      </Grid>
      <div style={{display:'flex',justifyContent:'center',alignItems:'cener'}}> 

      <Outlet/>
      </div>
    </div>
  );
};

export default AdminPage;
