import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
    role: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setError('Вам необходимо авторизоваться.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCancelChangePassword = () => {
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
    });
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    // Add logic to update password
    const authToken = localStorage.getItem('authToken');

    try {
      await axios.put(
        'http://localhost:5000/auth/update-password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Optionally, you can show a success message or perform additional actions
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
      });
    } catch (error) {
      // Handle password change error
      console.error('Failed to update password:', error);
    }
  };

  return (
    <form style={{ maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" style={{ marginBottom: '20px', marginTop: '25px', }}>
        Ваш профиль:
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={userData.username}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled
          />
          <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '5px' }}>
            Дата создания профиля: {new Date(userData.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            Роль: {userData.role}
          </Typography>
          {showChangePassword ? (
            <>
              <TextField
                label="Настоящий пароль"
                variant="outlined"
                fullWidth
                margin="normal"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              <TextField
                label="Новый пароль"
                variant="outlined"
                fullWidth
                margin="normal"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <Button
                type="button"
                variant="contained"
                color="secondary"
                style={{ marginTop: '20px', marginRight: '10px' }}
                onClick={handleCancelChangePassword}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleSavePassword}
              >
                Сохранить
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={handleShowChangePassword}
            >
              Изменить пароль
            </Button>
          )}
        </>
      )}
    </form>
  );
};

export default UserProfilePage;