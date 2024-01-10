import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditFAQPage = () => {
  const { id: faqId } = useParams();
  const [faqData, setFAQData] = useState({
    question: '',
    answer: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/faqs/${faqId}`);
        if (response && response.data) {
          setFAQData(response.data);
        }
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFAQData();
  }, [faqId]);

  const handleEditFAQ = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/faqs/${faqId}`,
        faqData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response && response.data) {
        console.log('FAQ успешно отредактирован:', response.data);
        navigate('/admin/faqs');
      }
    } catch (error) {
      console.error('Ошибка при редактировании FAQ:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFAQData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div style={{ padding: '25px' }}>
      <TextField
        label="Вопрос"
        value={faqData.question}
        onChange={(e) => handleInputChange('question', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ответ"
        value={faqData.answer}
        onChange={(e) => handleInputChange('answer', e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleEditFAQ} variant="contained" color="primary">
        Сохранить изменения
      </Button>
    </div>
  );
};

export default EditFAQPage;