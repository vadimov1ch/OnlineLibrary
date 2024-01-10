import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, FormControl, Paper } from '@mui/material';

const AdminUploadFilePage = ({ bookId, refreshBooks }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(`http://localhost:5000/${bookId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      refreshBooks();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', marginTop: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <FormControl fullWidth margin="small" style={{ marginBottom: '5px' }}>
    <Input type="file" id="file" onChange={handleFileChange} />
    </FormControl>
    <Button variant="contained" color="primary" onClick={handleUpload} style={{ width: '50%', marginTop: '10px' }}>
    Добавить файл
    </Button>
  </Paper>
  );
};

export default AdminUploadFilePage;