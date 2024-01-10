import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminNewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news');
        if (response && response.data) {
          setNews(response.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleDeleteNews = async (newsId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/news/${newsId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response && response.data) {
        setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== newsId));
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const formatDateTime = (datetimeString) => {
    const dateTime = new Date(datetimeString);
    return dateTime.toLocaleString(); // или другой метод форматирования, который вы предпочитаете
  };

  return (
    <div>
      <Button component={Link} to="/admin/add-news" variant="contained" color="primary" style={{ marginTop: '25px' }}>
        Добавить новость
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '25px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((newsItem, index) => (
              <TableRow key={newsItem._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{newsItem.title}</TableCell>
                <TableCell>{formatDateTime(newsItem.createdAt)}</TableCell>
                <TableCell>               
                  <Button onClick={() => handleDeleteNews(newsItem._id)} variant="outlined" color="secondary">
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminNewsPage;