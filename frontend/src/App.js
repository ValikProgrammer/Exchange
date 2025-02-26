// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExchangePage from './pages/ExchangePage';
import StatusPage from './pages/StatusPage';
import FaqPage from './pages/FaqPage';
import NewsPage from './pages/NewsPage';
import DocumentsPage from './pages/DocumentsPage';
import SupportPage from './pages/SupportPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;