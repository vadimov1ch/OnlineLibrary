import FavoriteModel from '../models/Favorite.js';
import UserModel from '../models/User.js';
import BookModel from '../models/Book.js';

export const addToFavorites = async (req, res) => {
    try {
      const userId = req.userId;
      const bookId = req.params.bookId;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      const book = await BookModel.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Книга не найдена' });
      }
  
      const favorites = await FavoriteModel.findOne({ user: userId });
      if (favorites && favorites.books.includes(bookId)) {
        return res.status(400).json({ message: 'Книга уже в избранном' });
      }
  
      if (!favorites) {
        const newFavorites = new FavoriteModel({
          user: userId,
          books: [bookId],
        });
        await newFavorites.save();
      } else {
        favorites.books.push(bookId);
        await favorites.save();
      }
  
      res.status(200).json({ message: 'Книга добавлена в избранное' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при добавлении в избранное' });
    }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    const bookId = req.params.bookId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }

    const favorites = await FavoriteModel.findOne({ user: userId });
    if (favorites && favorites.books.includes(bookId)) {
      favorites.books.pull(bookId);
      await favorites.save();
      res.status(200).json({ message: 'Удалено из избранного' });
    } else {
      res.status(404).json({ message: 'Книга не найдена в избранном' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при удалении из избранного' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const favorites = await FavoriteModel.findOne({ user: userId }).populate('books');
    if (favorites) {
      res.status(200).json(favorites.books);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при просмотре избранного' });
  }
};