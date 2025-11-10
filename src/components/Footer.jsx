const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">Bangladesh Automobile Olympiad</h4>
            <p className="text-white">The future of automobile innovation is here.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul>
                <li className="mb-2"><a href="/about" className="text-white hover:text-secondary-light">About Us</a></li>
                <li className="mb-2"><a href="/registration" className="text-white hover:text-secondary-light">Register</a></li>
                <li className="mb-2"><a href="/contact" className="text-white hover:text-secondary-light">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <ul>
                <li className="mb-2"><a href="#" className="text-white hover:text-secondary-light">Facebook</a></li>
                <li className="mb-2"><a href="#" className="text-white hover:text-secondary-light">Twitter</a></li>
                <li className="mb-2"><a href="#" className="text-white hover:text-secondary-light">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Admin</h5>
              <ul>
                <li className="mb-2"><a href="/admin/login" className="text-white hover:text-secondary-light">Admin Login</a></li>
                <li className="mb-2"><a href="/admin/register" className="text-white hover:text-secondary-light">Admin Register</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white pt-6 text-center text-white">
          <p>&copy; 2025 Bangladesh Automobile Olympiad. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;