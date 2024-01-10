import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response && response.data) {
        setFavorites(response.data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFromFavorites = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      // Update the list of favorites
      fetchFavorites();
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '80px' }}>
      <Typography variant="h4" color="primary" sx={{ marginBottom: '25px', marginTop: '25px' }}>
        Избранное:
      </Typography>
      <div style={{ marginTop: '20px' }}>
        <Grid container spacing={3} justifyContent="center">
          {favorites.map((book) => (
            <Grid item key={book._id}>
              <Card
                sx={{
                  width: '200px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={book.coverUrl || 'placeholder.jpg'} 
                    alt={book.title}
                    style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
                    {book.author}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}>
                        <RemoveRedEyeIcon sx={{ color: 'blue', marginRight: '2px', fontSize: '1.5rem' }} />
                        {book.viewsCount}
                      </span>
                      <span style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}>
                        <CommentIcon sx={{ color: 'blue', marginRight: '2px', fontSize: '1.5rem' }} />
                        {book.totalReviews}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: 'blue', marginRight: '2px', fontSize: '1.5rem' }} />
                        {book.averageRating !== undefined ? book.averageRating.toFixed(2) : 'Нет рейтинга'}
                      </span>
                    </div>
                    <Link to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>
                        <Typography variant="subtitle2" sx={{ cursor: 'pointer', fontSize: '14px', padding: '5px 10px'}}>
                          Подробнее
                        </Typography>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />} // Use DeleteIcon as the start icon
                      onClick={() => removeFromFavorites(book._id)}
                      sx={{ fontSize: '12px', padding: '5px 10px', margin: '5px 0' }} // Adjust the font size, padding, and margin
                    >
                      Удалить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default FavoritesPage;