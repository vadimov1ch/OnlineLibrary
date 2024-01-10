import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  InputBase,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const BooksPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/search/${searchType}/${searchText}`);
      if (response && response.data) {
        setBooks(response.data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while searching for books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const addToFavorites = async (bookId) => {
    try {
      await axios.post(`http://localhost:5000/favorites/add/${bookId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      fetchFavorites();
      navigate('/favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
  
      if (error.response && error.response.status === 400 && error.response.data.message === 'Книга уже в избранном') {
        toast.info('Уже имеется в избранном.');
      } else {
        toast.error('Ошибка при добавлении в избранное.');
      }
    }
  };

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

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response && response.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormControl sx={{ marginRight: '10px', minWidth: 120 }}>
          <InputLabel id="search-type-label"></InputLabel>
          <Select
            labelId="search-type-label"
            id="search-type"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <MenuItem value="title">Название</MenuItem>
            <MenuItem value="genre">Жанр</MenuItem>
            <MenuItem value="author">Автор</MenuItem>
          </Select>
        </FormControl>
        <InputBase
          placeholder={`Искать по ${searchType}...`}
          value={searchText}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          sx={{
            color: 'inherit',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '8px',
            width: '300px',
            marginRight: '10px',
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : <SearchIcon />}
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item key={book.id}>
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
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <Link to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>
                        <Typography variant="subtitle2" sx={{ cursor: 'pointer', fontSize: '14px', padding: '5px 10px'}}>
                          Подробнее
                        </Typography>
                      </Link>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <Button onClick={() => addToFavorites(book._id)} variant="contained" color="primary" sx={{ fontSize: '10px', padding: '5px 10px' }}>
                        <FavoriteIcon sx={{ marginRight: '5px' }} />
                        Избранное
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BooksPage;