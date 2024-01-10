import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AdminUploadFilePage from './AdminUploadFilePage';

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        if (response && response.data) {
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response && response.data) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const refreshBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      if (response && response.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error refreshing books:', error);
    }
  };

  return (
    <div>
      <Button component={Link} to="/admin/add-book" variant="contained" color="primary" style={{ marginTop: '25px' }}>
        Добавить
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '25px' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>№</TableCell>
        <TableCell>Название</TableCell>
        <TableCell>Жанр</TableCell>
        <TableCell>Автор</TableCell>
        <TableCell>Действия</TableCell>
        <TableCell style={{ width: '40%' }}>Добавление файла</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {books.map((book, index) => (
        <TableRow key={book._id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{book.title}</TableCell>
          <TableCell>{book.genre}</TableCell>
          <TableCell>{book.author}</TableCell>
          <TableCell>
            <Button component={Link} to={`/admin/edit-book/${book._id}`} variant="outlined" color="primary" style={{ marginRight: '10px' }}>
              Редактировать
            </Button>
            <Button onClick={() => handleDeleteBook(book._id)} variant="outlined" color="secondary">
              Удалить
            </Button>
          </TableCell>
          <TableCell style={{ maxWidth: '150px', maxHeight: '80px' }}>
            <AdminUploadFilePage bookId={book._id} refreshBooks={refreshBooks} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  );
};

export default AdminBooksPage; 