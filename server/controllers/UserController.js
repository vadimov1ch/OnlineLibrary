import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import AdminModel from '../models/Admin.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const usersData = users.map((user) => {
      const { passwordHash, ...userData } = user._doc;
      return userData;
    });

    res.json(usersData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to retrieve user information',
    });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await UserModel.find({ role: 'admin' });

    const adminsData = await Promise.all(admins.map(async (admin) => {
      const adminData = admin.toObject();
      const adminInfo = await AdminModel.findOne({ user: admin._id });
      if (adminInfo) {
        adminData.publishedBooksCount = adminInfo.publishedBooksCount;
      } else {
        adminData.publishedBooksCount = 0;
      }
      return adminData;
    }));

    res.json(adminsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to retrieve admin information',
    });
  }
};

export const registerAsAdmin = async (req, res) => {
  try {
    let role = 'user';

    const adminCode = req.body.adminCode;
      if (adminCode === 'admincode') {
          role = 'admin';
      } else {
          return res.status(403).json({
              message: 'Секретный код введён неверно',
          });
      }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      username: req.body.username,
      email: req.body.email,
      role: role,
      passwordHash: hash,
    });

    const user = await doc.save();

    if (user.role === 'admin') {
      const adminDoc = new AdminModel({
          user: user._id,
          publishedBooksCount: 0,
      });

      await adminDoc.save();
  }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Регистрация провалена',
    });
  }
};

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Регистрация провалена',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Авторизация провалена',
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (user.role === 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json({
        message: 'Access denied. Cannot delete an admin user.',
      });
    }

    await UserModel.findByIdAndDelete(userId);

    if (user.role === 'admin') {
      await AdminModel.findOneAndDelete({ user: userId });
    }

    return res.status(200).json({
      message: 'User successfully deleted',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error deleting user',
    });
  }
};

export const getMe = async (req, res) => {
  try 
  {
      const user = await UserModel.findById(req.userId)

      if (!user) {
          return res.statusCode(404).json({
              message: 'Пользователь не найден',
          });
      };

      const { passwordHash, ... userData } = user._doc;
  
      res.json(userData);
  }
  catch (err) 
  {
      console.log(err);
      res.status(500).json({
          message: 'Отказано в выполнении',
      });
  };
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Требуется предоставить текущий и новый пароли',
      });
    }

    const isValidPass = await bcrypt.compare(currentPassword, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Текущий пароль введен неверно',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = newHash;
    await user.save();

    res.status(200).json({
      message: 'Пароль успешно обновлен',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Ошибка при обновлении пароля',
    });
  }
};
