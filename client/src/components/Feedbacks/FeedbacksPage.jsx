import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from './FeedbackForm';
import Feedback from './Feedback';

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const updateFeedbacks = async () => {
    try {
      const feedbacksResponse = await axios.get('http://localhost:5000/feedbacks');
      setFeedbacks(feedbacksResponse.data);
    } catch (error) {
      console.error('Error updating feedbacks:', error);
    }
  };

  useEffect(() => {
    updateFeedbacks();
  }, []);

  const handleFeedbackDelete = () => {
    updateFeedbacks(); // Update feedbacks after a feedback is deleted
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Отзывы о системе</h1>
      <div style={{ width: '50%', marginBottom: '20px' }}>
        <FeedbackForm updateFeedbacks={updateFeedbacks} />
      </div>
      {feedbacks.map((feedback, index) => (
        <div key={feedback._id} style={{ width: '50%', marginBottom: '10px', borderBottom: index < feedbacks.length - 1 ? '1px solid #ccc' : 'none' }}>
          <Feedback feedback={feedback} onDelete={handleFeedbackDelete} />
        </div>
      ))}
    </div>
  );
};

export default FeedbacksPage;