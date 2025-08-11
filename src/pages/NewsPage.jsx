const NewsPage = () => {
  const news = [
    { id: 1, title: 'Upcoming Workshop on Engine Technology', date: '2025-09-15', summary: 'Join our workshop to learn about the latest advancements in engine technology from industry experts.', image: 'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'Registrations for the National Olympiad Now Open', date: '2025-09-10', summary: 'The registrations for the most awaited automobile olympiad are now open. Register now to participate and win exciting prizes.', image: 'https://images.unsplash.com/photo-1617802328543-5d6d83c5d1a4?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'A Look Back at the 2024 Olympiad', date: '2025-09-05', summary: 'A recap of the exciting events and winners from the 2024 Bangladesh Automobile Olympiad. See the highlights and get ready for this year.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">News & Updates</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
          {news.map(item => (
            <div key={item.id} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden md:flex">
              <img src={item.image} alt={item.title} className="w-full md:w-1/3 h-auto object-cover"/>
              <div className="p-6 md:p-8">
                <p className="text-gray-600 mb-2">{item.date}</p>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.summary}</p>
                <a href="#" className="text-blue-500 font-bold hover:underline">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;