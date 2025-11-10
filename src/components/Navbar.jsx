import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const { currentUser, userData } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    auth.signOut();
    toast.success('Logged out successfully!');
  };

  return (
    <nav className="bg-gray-600 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white"><img 
    src="../assets/BAO LOGO.png" alt="BAO Logo" className="h-8 w-auto"  
  /></Link>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-secondary-light" : "text-white hover:text-secondary-light transition duration-300"}>{t('home')}</NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? "text-secondary-light" : "text-white hover:text-secondary-light transition duration-300"}>{t('news')}</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-secondary-light" : "text-white hover:text-secondary-light transition duration-300"}>{t('gallery')}</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-secondary-light" : "text-white hover:text-secondary-light transition duration-300"}>{t('about')}</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-secondary-light" : "text-white hover:text-secondary-light transition duration-300"}>{t('contact')}</NavLink>
          <NavLink to="/past-papers" className={({ isActive }) => isActive ? "text-secondary-light" : "text-white hover:text-secondary-light transition duration-300"}>{t('past_papers')}</NavLink>
          <div className="relative">
            <button onClick={() => setIsDevMenuOpen(!isDevMenuOpen)} className="text-white hover:text-secondary-light transition duration-300">Dev</button>
            {isDevMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <Link to="/exam" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Exam</Link>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link to="/results" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Results</Link>


                <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                <Link to="/admin/news" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage News</Link>
                <Link to="/admin/gallery" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage Gallery</Link>
                <Link to="/admin/questions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage Questions</Link>
                <Link to="/admin/past-papers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage Past Papers</Link>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleLanguage} className="bg-secondary-light hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {language === 'en' ? 'বাংলা' : 'English'}
          </button>
          {currentUser ? (
            <>
              {userData && userData.role === 'admin' ? (
                <Link to="/admin/dashboard" className="bg-secondary-light text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">Dashboard</Link>
              ) : (
                <Link to="/profile" className="bg-secondary-light text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">Profile</Link>
              )}
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-secondary-light text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">Login</Link>
              <Link to="/registration" className="bg-secondary-light text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">Register</Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>{t('home')}</NavLink>
            <NavLink to="/registration" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>{t('registration')}</NavLink>
            <NavLink to="/news" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>{t('news')}</NavLink>
            <NavLink to="/gallery" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>{t('gallery')}</NavLink>
            <NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>{t('about')}</NavLink>
            <NavLink to="/contact" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>{t('contact')}</NavLink>
            <NavLink to="/exam" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Exam</NavLink>
            <NavLink to="/profile" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Profile</NavLink>
            <NavLink to="/results" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Results</NavLink>

            <NavLink to="/admin/login" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Admin Login</NavLink>
            <NavLink to="/admin/register" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Admin Register</NavLink>
            <NavLink to="/admin/dashboard" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Admin Dashboard</NavLink>
            <NavLink to="/admin/news" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Manage News</NavLink>
            <NavLink to="/admin/gallery" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Manage Gallery</NavLink>
            <NavLink to="/admin/questions" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Manage Questions</NavLink>
            <NavLink to="/admin/past-papers" onClick={toggleMenu} className={({ isActive }) => isActive ? "block text-secondary-light px-3 py-2 rounded-md text-base font-medium" : "block text-white hover:text-secondary-light px-3 py-2 rounded-md text-base font-medium"}>Manage Past Papers</NavLink>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { toggleMenu(); toggleLanguage(); }} className="w-full mt-2 bg-secondary-light hover:bg-blue-700 text-white text-center font-bold px-6 py-2 rounded-full transition duration-300">
              {language === 'en' ? 'বাংলা' : 'English'}
            </button>
            {currentUser ? (
              <>
                <Link to="/profile" onClick={toggleMenu} className="block bg-secondary-light text-white text-center px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">Profile</Link>
                <button onClick={() => { toggleMenu(); handleLogout(); }} className="w-full mt-2 bg-red-500 hover:bg-red-700 text-white text-center font-bold px-6 py-2 rounded-full transition duration-300">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="block bg-secondary-light text-white text-center px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;