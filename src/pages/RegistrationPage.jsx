const RegistrationPage = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Register for the Olympiad</h2>
          <form>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label htmlFor="institution" className="block text-gray-700 font-bold mb-2">Institution</label>
                <input type="text" id="institution" name="institution" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="event" className="block text-gray-700 font-bold mb-2">Select Event</label>
              <select id="event" name="event" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Engine & Transmission</option>
                <option>Vehicle Dynamics</option>
                <option>Automotive Electronics</option>
                <option>Design & Manufacturing</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105">Submit Registration</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;