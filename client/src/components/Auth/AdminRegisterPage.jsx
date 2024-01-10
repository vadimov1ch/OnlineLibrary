import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const AdminRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username || !email || !password || !adminCode) {
        console.error('Please fill in all fields');
        return;
      }

      const response = await axios.post('http://localhost:5000/auth/adminregister', {
        username,
        email,
        password,
        adminCode,
      });

      if (response && response.data) {
        console.log(response.data);

        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('username', response.data.username);

        navigate('/books');
        window.location.reload();
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5" align="center" style={{ marginTop: '25px' }}>
          Регистрация админа
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адрес"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="adminCode"
            label="Админский код"
            type="password"
            id="adminCode"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Зарегистрироваться как админ
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Авторизация
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default AdminRegisterPage;