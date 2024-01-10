import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddNewsPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddNews = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/news',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response && response.data) {
        console.log('Новость успешно добавлена:', response.data);
        navigate('/admin/news');
      }
    } catch (error) {
      console.error('Ошибка при добавлении новости:', error);
    }
  };

  return (
    <div style={{ padding: '25px' }}>
      <TextField
        label="Заголовок новости"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Содержание новости"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button onClick={handleAddNews} variant="contained" color="primary" style={{ marginTop: '15px' }}>
        Добавить новость
      </Button>
    </div>
  );
};

export default AddNewsPage;