import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Feedback = ({ feedback, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/feedbacks/${feedback._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      onDelete(); // Notify the parent component to update the feedbacks
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <p style={{ fontSize: '12px' }}>Рейтинг: {feedback.rating}</p>
        <p style={{ fontSize: '12px' }}>{feedback.comment}</p>
        {feedback.user && (
          <p style={{ fontSize: '12px' }}>Автор отзыва: {feedback.user.username}</p>
        )}
        <p style={{ fontSize: '10px' }}>Оставлен: {formatDate(feedback.createdAt)}</p>
      <Button variant="outlined" color="secondary" onClick={handleDelete} style={{ marginTop: '5px', fontSize: '10px' }}>
        Удалить отзыв
      </Button>
    </div>
  );
};

export default Feedback;