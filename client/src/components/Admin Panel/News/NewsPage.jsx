import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Divider } from '@mui/material';

const NewsPage = () => {
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

  return (
    <Container>
      <Typography variant="h2" style={{ margin: '20px 0' }}>
        Новости
      </Typography>
      <Grid container spacing={3}>
        {news.map((newsItem) => (
          <Grid key={newsItem._id} item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {newsItem.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Автор: {newsItem.user && newsItem.user.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Дата: {new Date(newsItem.createdAt).toLocaleString()}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="body1">{newsItem.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage;