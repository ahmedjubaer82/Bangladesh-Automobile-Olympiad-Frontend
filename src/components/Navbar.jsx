import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">BAO</Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition duration-300">Home</Link>
          <Link to="/registration" className="text-gray-600 hover:text-blue-500 transition duration-300">Registration</Link>
          <Link to="/news" className="text-gray-600 hover:text-blue-500 transition duration-300">News</Link>
          <Link to="/gallery" className="text-gray-600 hover:text-blue-500 transition duration-300">Gallery</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500 transition duration-300">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition duration-300">Contact</Link>
        </div>
        <Link to="/registration" className="hidden md:block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">Register Now</Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/registration" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Registration</Link>
            <Link to="/news" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">News</Link>
            <Link to="/gallery" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Gallery</Link>
            <Link to="/about" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/registration" className="block bg-accent-magenta text-white text-center px-6 py-2 rounded-full hover:bg-accent-cyan transition duration-300">Register Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;