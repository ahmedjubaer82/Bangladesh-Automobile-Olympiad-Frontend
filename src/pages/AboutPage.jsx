const AboutPage = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">The Bangladesh Automobile Olympiad is a prestigious national competition that brings together the brightest young minds with a passion for automobiles. Our mission is to promote education and innovation in automobile technology among students across the country.</p>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">To be the leading platform for identifying and nurturing future leaders in the automotive industry of Bangladesh.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">To organize a fair and challenging competition that tests the practical and theoretical knowledge of participants and to foster a spirit of sportsmanship and collaboration among students.</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <ul className="inline-flex flex-wrap space-x-4 md:space-x-8 text-gray-700">
              <li className="hover:text-blue-500 transition-colors duration-300">Integrity</li>
              <li className="hover:text-blue-500 transition-colors duration-300">Innovation</li>
              <li className="hover:text-blue-500 transition-colors duration-300">Excellence</li>
              <li className="hover:text-blue-500 transition-colors duration-300">Community</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;