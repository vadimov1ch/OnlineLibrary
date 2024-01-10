import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import Comment from './Comment';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);

  const updateReviews = async () => {
    try {
      const reviewsResponse = await axios.get(`http://localhost:5000/reviews/${bookId}`);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error('Error updating reviews:', error);
    }
  };

  const handleDownload = async () => {
    try {
      // Создаем ссылку на скачивание файла
      const downloadLink = document.createElement('a');
      downloadLink.href = `http://localhost:5000/${bookId}/download`;
      downloadLink.setAttribute('download', `${book.title}.pdf`);
      
      // Эмулируем клик по ссылке для запуска скачивания
      downloadLink.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const bookResponse = await axios.get(`http://localhost:5000/books/${bookId}`);
        const reviewsResponse = await axios.get(`http://localhost:5000/reviews/${bookId}`);

        setBook(bookResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching book and reviews:', error);
      }
    };

    fetchBookAndReviews();
  }, [bookId]);

  const handleReviewDelete = () => {
    updateReviews(); // Update reviews after a review is deleted
  };

  return (
    <div style={{ display: 'flex', paddingBottom: 'auto' }}>
      <div style={{ marginRight: '20px', flex: '1' }}>
        <h1>{book.title}</h1>
        <button onClick={handleDownload}>Скачать книгу</button>
        <p>Автор: {book.author}</p>
        <p>Жанр: {book.genre}</p>
        <img src={book.coverUrl} alt="Обложка" style={{ maxWidth: '100%', height: 'auto', maxHeight: '350px' }} />
        <p>{book.description}</p>
        <p>Количество просмотров: {book.viewsCount}</p>
        <h2 style={{ position: 'sticky', top: 0, background: '#fff', marginBottom: '10px' }}>
          Средний рейтинг: {book.averageRating !== undefined ? book.averageRating.toFixed(2) : 'Нет рейтинга'}
        </h2>
      </div>
      <div style={{ flex: '1', borderLeft: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <CommentForm bookId={bookId} updateReviews={updateReviews} />
        {reviews.map((review, index) => (
          <div key={review._id} style={{ marginBottom: '10px', borderBottom: index < reviews.length - 1 ? '1px solid #ccc' : 'none' }}>
            <Comment review={review} onDelete={handleReviewDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetailPage;