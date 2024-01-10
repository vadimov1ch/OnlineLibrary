import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Footer from './components/Markup/Footer';
import Header from './components/Markup/Header';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import AdminRegisterPage from './components/Auth/AdminRegisterPage';
import UserProfilePage from './components/Auth/UserProfilePage';
import HomePage from './components/HomePage';
import FaqPage from './components/Admin Panel/Faqs/FaqPage';
import AboutUsPage from './components/AboutUsPage';
import BooksPage from './components/Books/BooksPage';
import BookDetailPage from './components/Books/BookDetailPage';
import FavoritesPage from './components/FavoritesPage';
import NewsPage from './components/Admin Panel/News/NewsPage';
import FeedbacksPage from './components/Feedbacks/FeedbacksPage';
import AddNewsPage from './components/Admin Panel/News/AddNewsPage';
import EditNewsPage from './components/Admin Panel/News/EditNewsPage';
import AddBookPage from './components/Admin Panel/Books/AddBookPage';
import EditBookPage from './components/Admin Panel/Books/EditBookPage';
import AddFaqPage from './components/Admin Panel/Faqs/AddFaqPage';
import EditFaqPage from './components/Admin Panel/Faqs/EditFaqPage';
import AdminBooksPage from './components/Admin Panel/Books/AdminBooksPage';
import AdminAdminsPage from './components/Admin Panel/AdminAdminsPage';
import AdminUsersPage from './components/Admin Panel/AdminUsersPage';
import AdminNewsPage from './components/Admin Panel/News/AdminNewsPage';
import AdminFaqsPage from './components/Admin Panel/Faqs/AdminFaqsPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const isLoggedIn = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminregister" element={<AdminRegisterPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:bookId" element={<BookDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/feedbacks" element={<FeedbacksPage />} />
        <Route path="/news" element={<NewsPage />} />
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/faqs" element={<AdminFaqsPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/add-faq" element={<AddFaqPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/edit-faq/:id" element={<EditFaqPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/news" element={<AdminNewsPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/add-news" element={<AddNewsPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/edit-news/:id" element={<EditNewsPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/books" element={<AdminBooksPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/add-book" element={<AddBookPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/edit-book/:id" element={<EditBookPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/users" element={<AdminUsersPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        {isLoggedIn && userRole === 'admin' ? (
          <Route path="/admin/admins" element={<AdminAdminsPage />} />
        ) : (
          <Route path="/not-found" element={<NotFoundPage />} />
        )}
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;