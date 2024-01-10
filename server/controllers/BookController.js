import BookModel from '../models/Book.js';
import AdminModel from '../models/Admin.js';

  export const create = async (req, res) => {
    try {
      const doc = new BookModel({
        title: req.body.title,
        genre: req.body.genre,
        author: req.body.author,
        description: req.body.description,
        coverUrl: req.body.coverUrl,
        user: req.userId,
      });
  
      const book = await doc.save();

      await AdminModel.findOneAndUpdate(
        { user: req.userId },
        { $inc: { publishedBooksCount: 1 } }
    );
  
      res.json(book);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };

  export const remove = async (req, res) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await BookModel.findOneAndDelete({ _id: bookId });

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Книга не найдена',
            });
        }

        await AdminModel.findOneAndUpdate(
            { user: req.userId },
            { $inc: { publishedBooksCount: -1 } }
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
      const bookId = req.params.id;
  
      await BookModel.updateOne(
        {
          _id: bookId,
        },
        {
          title: req.body.title,
          genre: req.body.genre,
          author: req.body.author,
          description: req.body.description,
          coverUrl: req.body.coverUrl,
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

export const getOne = async (req, res) => {
  try {
    const bookId = req.params.id;
  
    const updatedBook = await BookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate('user');
  
    if (!updatedBook) {
      return res.status(404).json({
        message: 'Книга не найдена',
      });
    }
  
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Непредвиденная ошибка',
    });
  }
  };

  export const getAll = async (req, res) => {
    try {
      const books = await BookModel.find().populate('user').exec();
      res.json(books);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };

  export const searchBooksByTitle = async (req, res) => {
    try {
      const { title } = req.params;
      const books = await BookModel.find({ title: { $regex: new RegExp(title, 'i') } }).populate('user').exec();
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };

  export const searchBooksByGenre = async (req, res) => {
    try {
      const { genre } = req.params;
      const books = await BookModel.find({ genre: { $regex: new RegExp(genre, 'i') } })
        .populate('user')
        .exec();
  
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };

  export const searchBooksByAuthor = async (req, res) => {
    try {
      const { author } = req.params;
      const books = await BookModel.find({ author: { $regex: new RegExp(author, 'i') } })
        .populate('user')
        .exec();
  
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Непредвиденная ошибка',
      });
    }
  };