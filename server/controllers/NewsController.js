import NewsModel from '../models/News.js';

export const createNews = async (req, res) => {
  try {
    const news = new NewsModel({
      title: req.body.title,
      content: req.body.content,
      user: req.userId,
    });

    const createdNews = await news.save();

    res.json(createdNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
};

export const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await NewsModel.findByIdAndDelete(id);

    if (!deletedNews) {
      res.status(404).json({ message: 'Новость не найдена' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const newsList = await NewsModel.find().sort({ createdAt: -1 }).populate('user').exec();
    res.json(newsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
};

export const getOneNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await NewsModel.findById(id).populate('user').exec();

    if (!news) {
      res.status(404).json({ message: 'Новость не найдена' });
      return;
    }

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
};