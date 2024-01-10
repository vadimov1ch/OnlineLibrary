import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Comment = ({ review, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${review._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      onDelete(); // Notify the parent component to update the reviews
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <p>{review.text}</p>
      <p>Рейтинг: {review.rating}</p>
      <p>{review.comment}</p>
      {review.user && <p>Автор отзыва: {review.user.username}</p>}
      <Button variant="outlined" color="secondary" onClick={handleDelete} style={{ marginBottom: '8px' }}>
        Удалить отзыв
      </Button>
    </div>
  );
};

export default Comment;