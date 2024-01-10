import FeedbackModel from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const feedback = new FeedbackModel({
      user: req.userId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const createdFeedback = await feedback.save();
    res.json(createdFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Непредвиденная ошибка',
    });
  }
};

export const removeFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const userId = req.userId;

    const deletedFeedback = await FeedbackModel.findOneAndDelete({ _id: feedbackId, user: userId });

    if (!deletedFeedback) {
      return res.status(404).json({
        message: 'Отзыв не найден или у вас нет прав на его удаление',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Непредвиденная ошибка',
    });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;

    await FeedbackModel.updateOne(
      { _id: feedbackId, user: req.userId },
      {
        rating: req.body.rating,
        comment: req.body.comment,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Непредвиденная ошибка',
    });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await FeedbackModel.find().sort({ createdAt: -1 }).populate('user').exec();
    res.json(feedbackList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Непредвиденная ошибка',
    });
  }
};