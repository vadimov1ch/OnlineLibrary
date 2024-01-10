import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Window = ({ title, text }) => {
  const windowStyle = {
    width: '200px',
    padding: '16px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    margin: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    ':hover': {
      transform: 'scale(1.05)',
    },
  };

  return (
    <Box style={windowStyle}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

const AboutUsPage = () => {
  const windowsData = [
    { title: 'Кто мы?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis commodo ex. Morbi bibendum varius orci at viverra. In hac habitasse platea dictumst. Suspendisse quis ipsum pretium, hendrerit lorem eu.'},
    { title: 'Наши особенности', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut aliquam urna, ut tincidunt ligula. Nunc faucibus auctor enim, nec venenatis odio mattis quis. Lorem ipsum dolor sit amet, consectetur.' },
    { title: 'Наша миссия', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non purus id metus eleifend blandit et non justo. Cras vel mauris vitae mi ullamcorper dignissim. Vivamus euismod et risus vel.' },
    { title: 'Связь с нами', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt aliquet sapien a aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nec dapibus massa.' },
    { title: 'Наш вклад в сообщество', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod nunc metus. Aenean sed elementum libero. Sed at consequat orci, et condimentum neque. Nunc quis diam sed enim varius mollis.' },  
    { title: 'Партнеры', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel diam ex. Aenean interdum metus vel tellus commodo rutrum. Nunc a dignissim purus, sit amet pulvinar orci. Sed neque nisi.' },  
  ];

  return (
    <Container maxWidth="md" mt={5} textAlign="center" style={{ marginTop: '25px' }}>
      <Typography variant="h4" mb={4}>
        О нас
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {windowsData.map((data, index) => (
          <Window key={index} title={data.title} text={data.text} />
        ))}
      </Box>
    </Container>
  );
};

export default AboutUsPage;