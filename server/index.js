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