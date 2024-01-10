import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { UserController, BookController, ReviewController, FavoriteController, FAQController, NewsController, FeedbackController } from './controllers/index.js';
import { checkAuth, checkIsAdmin, handleValidationErrors } from './utils/index.js';
import { uploadRouter, upload, uploadFile, downloadFile } from './controllers/UploadController.js';
import { 
    loginValidation, 
    registerValidation, 
    bookUpdateValidation, 
    bookCreateValidation, 
    reviewCreateValidation, 
    feedbackCreateValidation,
    newsCreateValidation,
    faqCreateValidation
 } from './utils/validations.js';

 mongoose
.connect('mongodb+srv://admin:admin123@devcluster.vmaf44v.mongodb.net/LibOnline?retryWrites=true&w=majority')
.then(() => console.log('DataBase is OK'))
.catch((err) => console.log('DataBase error', err));

const app = express();
app.use(express.json());
app.use(cors()); 

// UPLOADS ROUTES
app.post('/:bookId/upload', upload.single('file'), uploadFile);
app.get('/:bookId/download', downloadFile);

// USER ROUTES
app.get('/users', UserController.getAllUsers);
app.get('/admins', UserController.getAllAdmins);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/adminregister', registerValidation, handleValidationErrors, UserController.registerAsAdmin);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.put('/auth/update-password', checkAuth, UserController.updatePassword);
app.delete('/users/:id', UserController.deleteUser);

// BOOKS ROUTES
app.get('/books/:id', BookController.getOne);
app.get('/books', BookController.getAll);
app.get('/search/title/:title', BookController.searchBooksByTitle);
app.get('/search/author/:author', BookController.searchBooksByAuthor);
app.get('/search/genre/:genre', BookController.searchBooksByGenre);
app.post('/books', checkAuth, checkIsAdmin, bookCreateValidation, handleValidationErrors, BookController.create);
app.delete('/books/:id', checkAuth, checkIsAdmin, BookController.remove);
app.patch('/books/:id', checkAuth, checkIsAdmin, bookUpdateValidation, handleValidationErrors, BookController.update);