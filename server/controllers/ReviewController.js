import ReviewModel from '../models/Review.js';
import BookModel from '../models/Book.js';

  export const create = async (req, res) => {
    try {
        const doc = new ReviewModel({
            rating: req.body.rating,
            comment: req.body.comment,
            book: req.params.id,
            user: req.userId,
        });

        const review = await doc.save();

        const bookId = req.params.id;
        const existingReviews = await ReviewModel.find({ book: bookId });
        const totalRating = existingReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / existingReviews.length;

        await BookModel.findOneAndUpdate(
            { _id: bookId },
            { averageRating: averageRating, totalReviews: existingReviews.length }
        );

        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Непредвиденная ошибка',
        });
    }
  };

  export const remove = async (req, res) => {
    try {
      const reviewId = req.params.id;
      const userId = req.userId;
  
      const deletedReview = await ReviewModel.findOneAndDelete({ _id: reviewId, user: userId });
  
      if (!deletedReview) {
        return res.status(404).json({
          message: 'Отзыв не найден или у вас нет прав на его удаление',
        });
      }
  
      const bookId = deletedReview.book;
      const remainingReviews = await ReviewModel.find({ book: bookId });
      const totalRating = remainingReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = remainingReviews.length > 0 ? totalRating / remainingReviews.length : 0;
  
      await BookModel.findOneAndUpdate(
        { _id: bookId },
        { averageRating: averageRating, totalReviews: remainingReviews.length }
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

  export const update = async (req, res) => {
    try {
      const reviewId = req.params.id;
  
      await ReviewModel.updateOne(
        {
          _id: reviewId,
        },
        {
            rating: req.body.rating,
            comment: req.body.comment,
            book: req.bookId,
            user: req.userId,
        },
      );
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };

  export const getAll = async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      const reviews = await ReviewModel.find({ book: bookId }).populate('user').exec();
      res.json(reviews);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };

