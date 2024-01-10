import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, TextareaAutosize, Alert } from '@mui/material';

const CommentForm = ({ bookId, updateReviews }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const submitComment = async (event) => {
    event.preventDefault();

    if (!localStorage.getItem('authToken')) {
      setShowAuthAlert(true);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/books/${bookId}/reviews`, {
        comment,
        rating,
        book: bookId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      updateReviews();
      setComment('');
      setRating(0);
      setShowAuthAlert(false);
      window.location.reload();
      console.log('Отзыв добавлен');
    } catch (error) {
      console.error('Error submitting comment:', error);
      console.log('Error response:', error.response);
    }
  };

  return (
    <form onSubmit={submitComment}>
      {showAuthAlert && (
        <Alert severity="warning" onClose={() => setShowAuthAlert(false)}>
          Вам необходимо авторизоваться, чтобы добавить отзыв.
        </Alert>
      )}
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label htmlFor="rating" style={{ marginRight: '10px' }}>
          Рейтинг:
        </label>
        <FormControl fullWidth>
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            style={{ width: '80px', textAlign: 'center' }}
          >
            <option value={0}>Choose</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </FormControl>
      </div>
      <TextareaAutosize
        value={comment}
        onChange={handleCommentChange}
        placeholder="Ваш комментарий ..."
        style={{ width: '100%', minHeight: '80px', marginBottom: '10px' }}
      />
      <br />
      <Button type="submit" variant="contained" color="primary" style={{ width: '100%', color: 'white' }}>
        Добавить отзыв
      </Button>
    </form>
  );
};

export default CommentForm;