import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditBookPage = () => {
    const { id: bookId } = useParams();
    const [bookData, setBookData] = useState({
      title: '',
      author: '',
      coverUrl: '',
      genre: '',
      description: '',
    });
    const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${bookId}`);
        if (response && response.data) {
          setBookData(response.data);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleEditBook = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/books/${bookId}`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response && response.data) {
        console.log('Книга успешно отредактирована:', response.data);
        navigate('/admin/books');
      }
    } catch (error) {
      console.error('Ошибка при редактировании книги:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setBookData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div style={{ padding: '25px' }}>
      <TextField
        label="Название книги"
        value={bookData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Жанр"
        value={bookData.genre}
        onChange={(e) => handleInputChange('genre', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Автор"
        value={bookData.author}
        onChange={(e) => handleInputChange('author', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Описание"
        value={bookData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ссылка на обложку"
        value={bookData.coverUrl}
        onChange={(e) => handleInputChange('coverUrl', e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleEditBook} variant="contained" color="primary">
        Сохранить изменения
      </Button>
    </div>
  );
};

export default EditBookPage;