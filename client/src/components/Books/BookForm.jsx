import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const BookForm = ({ onSubmit }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        Добавить книгу
      </Typography>
      <TextField
        label="Название"
        variant="outlined"
        fullWidth
        margin="normal"
        name="title"
        value={bookData.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Автор"
        variant="outlined"
        fullWidth
        margin="normal"
        name="author"
        value={bookData.author}
        onChange={handleChange}
        required
      />
      <TextField
        label="Жанр"
        variant="outlined"
        fullWidth
        margin="normal"
        name="genre"
        value={bookData.genre}
        onChange={handleChange}
        required
      />
      <TextField
        label="Описание"
        variant="outlined"
        multiline
        fullWidth
        margin="normal"
        name="description"
        value={bookData.description}
        onChange={handleChange}
        required
      />
      <TextField
        label="URL обложки"
        variant="outlined"
        fullWidth
        margin="normal"
        name="coverUrl"
        value={bookData.coverUrl}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Добавить
      </Button>
    </form>
  );
};

export default BookForm;