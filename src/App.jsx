import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;