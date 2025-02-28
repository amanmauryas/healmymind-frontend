import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TestsPage from './pages/TestsPage';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import ResourcesPage from './pages/ResourcesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogPage from './pages/BlogPage';
import ChatBotPage from './pages/ChatBotPage';
import DashboardPage from './pages/DashboardPage'; // Import the new DashboardPage

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tests" element={<TestsPage />} />
            <Route path="/test/:testId" element={<TestPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} /> {/* New route for Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/chat" element={<ChatBotPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
