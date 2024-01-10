import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';  
import logoImage from './logo.png';

const HomePage = () => {
  const isAuthenticated = localStorage.getItem('authToken');

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h4" mb={4}>
        Добро пожаловать в ONLINE LIBRARY!
      </Typography>
      <Typography variant="body1" mb={4} style={{ marginLeft: '25px', marginRight: '25px', textAlign: 'center' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae orci vel risus euismod finibus. Phasellus a vulputate mi. Morbi fermentum arcu et elementum congue. Phasellus hendrerit mattis mi. Aenean vitae urna iaculis libero dapibus pretium. Morbi vitae diam quis nulla molestie auctor. Praesent euismod quis turpis vitae elementum. Vestibulum ornare tortor mauris, vitae malesuada leo consequat sit amet.
      Mauris venenatis ligula imperdiet urna dictum lacinia. Nulla eget orci aliquam, auctor dolor sit amet, commodo turpis. Phasellus eu dui rutrum, pharetra ligula id, condimentum magna. Nunc eget sem vel nibh tempus ultrices. Sed at iaculis nunc. Integer vestibulum pellentesque mi id scelerisque. Donec tristique leo in lectus tristique consectetur. In hac habitasse platea dictumst. Ut commodo ligula risus, nec tristique ipsum laoreet non.
      Fusce in quam id lorem pretium rutrum. Nullam lectus magna, sagittis in quam a, imperdiet auctor risus. Cras dictum, urna eget pharetra placerat, purus libero lacinia nisi, egestas ultricies orci arcu ut velit. In congue volutpat ultrices. Nullam felis neque, malesuada id magna sed, tincidunt dapibus mi. Mauris libero metus, mollis in suscipit et, auctor sit amet lorem. Morbi congue turpis nec diam facilisis rhoncus. Integer at nulla faucibus, varius quam eget, semper neque. Nam ullamcorper, ex tristique maximus imperdiet, eros ipsum tincidunt mauris, in ornare enim ex sit amet nibh. Curabitur et purus id dolor ullamcorper fermentum ac aliquet eros. Donec rutrum id urna sed blandit. Ut vel augue faucibus, tincidunt sapien at, hendrerit lacus. Pellentesque sit amet volutpat sapien. Aenean non magna eget nisl mollis blandit.
      </Typography>
      {!isAuthenticated && (
        <>
          <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
            Войти
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/register">
            Зарегистрироваться
          </Button>
        </>
      )}
      <Box mt={5} position="relative">
      <img src={logoImage} alt="Logo" style={{ maxWidth: '450%', maxHeight: '450px', margin: 'auto' }} />
      </Box>
    </Box>
  );
};

export default HomePage;