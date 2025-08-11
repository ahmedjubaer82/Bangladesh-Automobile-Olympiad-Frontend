const GalleryPage = () => {
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop', alt: 'Sports Car' },
    { id: 2, src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', alt: 'Classic Car' },
    { id: 3, src: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=1974&auto=format&fit=crop', alt: 'Car Engine' },
    { id: 4, src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop', alt: 'Modern Car' },
    { id: 5, src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop', alt: 'Red Car' },
    { id: 6, src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1974&auto=format&fit=crop', alt: 'White Car' },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map(image => (
            <div key={image.id} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-800">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;