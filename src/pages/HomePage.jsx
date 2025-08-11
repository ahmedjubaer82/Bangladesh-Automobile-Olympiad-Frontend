const HomePage = () => {
  return (
    <div>
      <header 
        className="relative bg-cover bg-center text-white text-center py-20 md:py-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580273916550-425a4b5b3592?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Bangladesh Automobile Olympiad</h1>
          <p className="text-xl mb-8">Igniting the passion for automotive excellence.</p>
          <a href="/registration" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105">Register Now</a>
        </div>
      </header>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Premier Automotive Competition</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">The Bangladesh Automobile Olympiad is a national platform for students to showcase their knowledge, skills, and passion for the automotive industry. Compete with the best, learn from experts, and kickstart your career in automobiles.</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Participate?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Showcase Your Skills</h3>
              <p className="text-gray-600">Demonstrate your expertise in automotive engineering and technology.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Win Amazing Prizes</h3>
              <p className="text-gray-600">Compete for scholarships, internships, and other valuable prizes.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Network with Experts</h3>
              <p className="text-gray-600">Connect with industry leaders, professionals, and fellow enthusiasts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;