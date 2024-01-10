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