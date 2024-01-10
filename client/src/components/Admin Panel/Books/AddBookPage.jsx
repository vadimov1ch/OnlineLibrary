import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddBook = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/books',
        { title, author, coverUrl, genre, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response && response.data) {
        console.log('Книга успешно добавлена:', response.data);
        navigate('/admin/books');
      }
    } catch (error) {
      console.error('Ошибка при добавлении книги:', error);
    }
  };

  return (
    <div style={{ padding: '25px' }}>
      <TextField
        label="Название книги"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Жанр"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ссылка на обложку"
        value={coverUrl}
        onChange={(e) => setCoverUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddBook} variant="contained" color="primary">
        Добавить
      </Button>
    </div>
  );
};

export default AddBookPage;