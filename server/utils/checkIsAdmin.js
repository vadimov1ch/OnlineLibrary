import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export default async (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');

      const user = await UserModel.findById(decoded._id);

      if (!user) {
        return res.status(403).json({
          message: 'Пользователь не найден',
        });
      }

      req.userRole = user.role;

      if (req.userRole === 'admin') {
        next();
      } else {
        return res.status(403).json({
          message: 'Вы не обладаете правами на выполнение этой операции',
        });
      }
    } catch (e) {
      return res.status(403).json({
        message: 'Вы не обладаете правами на выполнение этой операции',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Вы не обладаете правами на выполнение этой операции',
    });
  }
};