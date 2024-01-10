import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminFaqsPage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/faqs');
        if (response && response.data) {
          setFaqs(response.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const handleDeleteFaq = async (faqId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/faqs/${faqId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response && response.data) {
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqId));
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div>
      <Button component={Link} to="/admin/add-faq" variant="contained" color="primary" style={{ marginTop: '25px' }}>
        Добавить
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '25px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Вопрос</TableCell>
              <TableCell>Ответ</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs.map((faq, index) => (
              <TableRow key={faq._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{faq.question}</TableCell>
                <TableCell>{faq.answer}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/admin/edit-faq/${faq._id}`} variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                    Редактировать
                  </Button>
                  <Button onClick={() => handleDeleteFaq(faq._id)} variant="outlined" color="secondary">
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminFaqsPage;