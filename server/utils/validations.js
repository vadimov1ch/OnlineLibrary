import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать от 8 до 16 символов').isLength({ min: 8, max: 16 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать от 8 до 16 символов').isLength({ min: 8, max: 16 }),
  body('username', 'Имя пользователя введено неверно').isLength({ min: 3 }),
];

export const bookCreateValidation = [
  body('title', 'Некорректное название книги').isLength({ min: 5}).isString(),
  body('genre', 'Некорректный жанр книги').isLength({ min: 3}).isString(),
  body('author', 'Некорректный автор книги').isLength({ min: 5}).isString(),
  body('description', 'Некорректное описание книги').isLength({ min: 5}).isString(),
  body('coverUrl', 'Некорректная URL ссылка').optional().isURL(),
];

export const bookUpdateValidation = [
  body('title', 'Некорректное название книги').optional().isLength({ min: 5}).isString(),
  body('genre', 'Некорректный жанр книги').optional().isLength({ min: 3}).isString(),
  body('author', 'Некорректный автор книги').optional().isLength({ min: 5}).isString(),
  body('description', 'Некорректное описание книги').optional().isLength({ min: 5}).isString(),
  body('coverUrl', 'Некорректная URL ссылка').optional().optional().isURL(),
];

export const reviewCreateValidation = [
  body('rating', 'Рейтинг должен быть от 1 до 5').isNumeric().isFloat({ min: 1, max: 5 }),
  body('comment', 'Введите комментарий').isString().isLength({ min: 5 }),
];

export const feedbackCreateValidation = [
  body('rating', 'Рейтинг должен быть от 1 до 5').isNumeric().isFloat({ min: 1, max: 5 }),
  body('comment', 'Введите комментарий').isString().isLength({ min: 5 }),
];

export const newsCreateValidation = [
  body('title', 'Введите заголовок новости').isString().isLength({ min: 5 }),
  body('content', 'Введите содержание новости').isString().isLength({ min: 10 }),
];

export const faqCreateValidation = [
  body('question', 'Введите вопрос').isString().isLength({ min: 5 }),
  body('answer', 'Введите ответ').isString().isLength({ min: 10 }),
];

