import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditNewsPage = () => {
  const { id: newsId } = useParams();
  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/news/${newsId}`);
        if (response && response.data) {
          setNewsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, [newsId]);

  const handleEditNews = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/news/${newsId}`,
        newsData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response && response.data) {
        console.log('Новость успешно отредактирована:', response.data);
        navigate('/admin/news');
      }
    } catch (error) {
      console.error('Ошибка при редактировании новости:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setNewsData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div style={{ padding: '25px' }}>
      <TextField
        label="Заголовок новости"
        value={newsData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Содержание новости"
        multiline
        rows={4}
        value={newsData.content}
        onChange={(e) => handleInputChange('content', e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleEditNews} variant="contained" color="primary">
        Сохранить изменения
      </Button>
    </div>
  );
};

export default EditNewsPage;