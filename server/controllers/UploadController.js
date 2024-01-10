import multer from 'multer';
import path from 'path';
import Book from '../models/Book.js';
import express from 'express';
import fs from 'fs';

const router = express.Router();

// Конфигурация multer для сохранения файлов в нужную директорию
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname); // Уникальное имя файла
  }
});

// Проверка типа загружаемого файла
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/pdf')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image or PDF files are allowed.'), false);
  }
};

// Настройка multer с использованием конфигурации
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Контроллер для загрузки файла
const uploadFile = async (req, res) => {
  try {
    const fileUrl = req.file.path; // Пример: 'uploads/1629315022854.pdf'

    const bookId = req.params.bookId;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { fileUrl: fileUrl },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    res.status(200).json({ fileUrl: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading file.' });
  }
};

// Контроллер для скачивания файла
const downloadFile = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    if (!book.fileUrl) {
      return res.status(404).json({ error: 'File not found for this book.' });
    }

    res.download(book.fileUrl, path.basename(book.fileUrl));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error downloading file.' });
  }
};

export { upload, uploadFile, downloadFile, router as uploadRouter, storage };