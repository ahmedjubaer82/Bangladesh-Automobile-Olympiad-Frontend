const ContactPage = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-4">We'd love to hear from you. Whether you have a question about the event, registration, or anything else, our team is ready to answer all your questions.</p>
              <div className="space-y-4">
                <p className="flex items-center"><strong className="mr-2">Email:</strong> info@auto-olympiad.bd</p>
                <p className="flex items-center"><strong className="mr-2">Phone:</strong> +880 1234 567890</p>
                <p className="flex items-center"><strong className="mr-2">Address:</strong> 123 Automobile Road, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Your Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                  <textarea id="message" name="message" rows="5" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <div className="text-right">
                  <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;