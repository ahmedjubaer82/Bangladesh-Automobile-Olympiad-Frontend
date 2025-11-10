import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit, startAfter, endBefore } from 'firebase/firestore';

import { ClipLoader } from 'react-spinners';

const GalleryPage = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState({ list: [], page: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);

  const fetchImages = useCallback(async (page = 0, direction = 'next', pageToken) => {
    setLoading(true);
    try {
      const imagesCollectionRef = collection(db, 'gallery');
      let q;
      if (direction === 'next') {
        q = query(imagesCollectionRef, orderBy('uploadedAt', 'desc'), startAfter(pageToken), limit(9));
      } else {
        q = query(imagesCollectionRef, orderBy('uploadedAt', 'desc'), endBefore(pageToken), limit(9));
      }

      if (page === 0) {
        q = query(imagesCollectionRef, orderBy('uploadedAt', 'desc'), limit(9));
      }

      const querySnapshot = await getDocs(q);
      const imagesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setFirstVisible(querySnapshot.docs[0]);

      setImages({ list: imagesList, page });
    } catch (err) {
      setError('Failed to fetch images: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(0);
  }, []);

  const handleNextPage = () => {
    fetchImages(images.page + 1, 'next', lastVisible);
  };

  const handlePrevPage = () => {
    fetchImages(images.page - 1, 'prev', firstVisible);
  };

  const filteredImages = images.list.filter(image =>
    image.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center py-20"><ClipLoader color={'#1a202c'} loading={loading} size={50} /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">{t('galleryTitle')}</h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search images..."
            className="p-2 border rounded w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No gallery images available.</p>
          ) : (
            filteredImages.map(image => (
              <div key={image.id} className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <img src={image.imageUrl} alt={image.alt} className="w-full h-64 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-text-primary">{image.alt}</h3>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevPage}
            disabled={images.page === 0}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={filteredImages.length < 9}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;