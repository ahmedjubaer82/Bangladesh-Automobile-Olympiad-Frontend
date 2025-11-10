import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageNewsPage from './pages/admin/ManageNewsPage';
import ManageGalleryPage from './pages/admin/ManageGalleryPage';
import ManageQuestionsPage from './pages/admin/ManageQuestionsPage';
import StudentLoginPage from './pages/StudentLoginPage';
import ProfilePage from './pages/ProfilePage';
import ExamPage from './pages/ExamPage';
import ResultsPage from './pages/ResultsPage';


import ManagePastPapers from './pages/admin/ManagePastPapers';

import PastPapersPage from './pages/PastPapersPage';
import ErrorPage from './pages/ErrorPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<StudentLoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/results" element={<ResultsPage />} />

          <Route path="/past-papers" element={<PastPapersPage />} />


          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<ManageNewsPage />} />
          <Route path="/admin/gallery" element={<ManageGalleryPage />} />
          <Route path="/admin/questions" element={<ManageQuestionsPage />} />
          <Route path="/admin/past-papers" element={<ManagePastPapers />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;