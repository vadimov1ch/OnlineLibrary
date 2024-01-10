import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const FaqPage = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await axios.get('http://localhost:5000/faqs');
        setFaqData(response.data);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFAQ();
  }, []);

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h4" mb={4}>
        Часто задаваемые вопросы (FAQ)
      </Typography>
      {faqData.map((faq, index) => (
        <Paper key={index} elevation={3} style={{ margin: '10px', padding: '15px', borderRadius: '10px', border: '2px solid #2196f3' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}a-content`} id={`panel${index + 1}a-header`}>
              <Typography variant="body1" fontWeight="bold">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" fontStyle="italic">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
    </Box>
  );
};

export default FaqPage;