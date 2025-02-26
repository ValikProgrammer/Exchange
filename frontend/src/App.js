import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ExchangePage from './pages/ExchangePage';
import StatusPage from './pages/StatusPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminExchanges from './pages/admin/AdminExchanges';
import AdminRates from './pages/admin/AdminRates';
import AdminSettings from './pages/admin/AdminSettings';
import AdminWallets from './pages/admin/AdminWallets';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';

const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#0f1923',
    background: '#0f1923',
    backgroundLight: '#1a2c38',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)'
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif"
  },
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="exchange" element={<ExchangePage />} />
            <Route path="status/:id" element={<StatusPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="exchanges" element={<AdminExchanges />} />
            <Route path="rates" element={<AdminRates />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="wallets" element={<AdminWallets />} />
          </Route>
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;