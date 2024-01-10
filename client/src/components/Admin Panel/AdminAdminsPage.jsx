import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminAdminsPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admins'); 
        
        if (response && response.data) {
          setAdmins(response.data);
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: '25px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Имя администратора</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Дата регистрации</TableCell>
              <TableCell>Кол-во книг</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow key={admin._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{new Date(admin.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{admin.publishedBooksCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminAdminsPage;