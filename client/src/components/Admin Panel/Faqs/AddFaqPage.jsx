import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddFaqPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleAddFAQ = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/faqs',
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );   

      if (response && response.data) {
        console.log('FAQ успешно добавлен:', response.data);
        navigate('/admin/faqs');
      }
    } catch (error) {
      console.error('Ошибка при добавлении FAQ:', error);
    }
  };

  return (
    <div style={{ padding: '25px' }}>
      <TextField
        label="Вопрос"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ответ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddFAQ} variant="contained" color="primary">
        Добавить
      </Button>
    </div>
  );
};

export default AddFaqPage;