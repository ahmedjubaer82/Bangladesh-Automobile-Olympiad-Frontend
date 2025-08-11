const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-10">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">Bangladesh Automobile Olympiad</h4>
            <p className="text-gray-400">The future of automobile innovation is here.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul>
                <li className="mb-2"><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li className="mb-2"><a href="/registration" className="text-gray-400 hover:text-white">Register</a></li>
                <li className="mb-2"><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <ul>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; 2025 Bangladesh Automobile Olympiad. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;