import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AdminBurgerMenu from '../Admin Panel/AdminBurgerMenu';

const Header = () => {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');
    setUsername(storedUsername || '');
    setUserRole(storedUserRole || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem('authToken');
  const isAdmin = userRole === 'admin';

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          ONLINE LIBRARY
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ marginRight: '15px' }}></div>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/about">
            О нас
          </Button>
          <Button color="inherit" component={Link} to="/faq">
            FAQ
          </Button>
          <Button color="inherit" component={Link} to="/books">
            Книги
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Избранное
          </Button>
          <Button color="inherit" component={Link} to="/news">
            Новости
          </Button>
          <Button color="inherit" component={Link} to="/feedbacks">
            Отзывы
          </Button>
          {isAdmin && <AdminBurgerMenu />}
        </div>
        <div>
            {isLoggedIn ? (
            <>
              <Typography variant="subtitle1" style={{ marginRight: '16px' }}>
                Привет, <Link to="/profile" style={{ color: 'inherit', textDecoration: 'underline' }}>{username}</Link>!
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Выход
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Вход
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Регистрация
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;