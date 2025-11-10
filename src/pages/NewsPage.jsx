import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit, startAfter, endBefore } from 'firebase/firestore';

import { ClipLoader } from 'react-spinners';

const NewsPage = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState({ list: [], page: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);

  const fetchNews = useCallback(async (page = 0, direction = 'next', pageToken) => {
    setLoading(true);
    try {
      const newsCollectionRef = collection(db, 'news');
      let q;
      if (direction === 'next') {
        q = query(newsCollectionRef, orderBy('date', 'desc'), startAfter(pageToken), limit(5));
      } else {
        q = query(newsCollectionRef, orderBy('date', 'desc'), endBefore(pageToken), limit(5));
      }

      if (page === 0) {
        q = query(newsCollectionRef, orderBy('date', 'desc'), limit(5));
      }

      const querySnapshot = await getDocs(q);
      const newsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setFirstVisible(querySnapshot.docs[0]);

      setNews({ list: newsList, page });
    } catch (err) {
      setError('Failed to fetch news: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(0);
  }, []);

  const handleNextPage = () => {
    fetchNews(news.page + 1, 'next', lastVisible);
  };

  const handlePrevPage = () => {
    fetchNews(news.page - 1, 'prev', firstVisible);
  };

  const filteredNews = news.list.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center py-20"><ClipLoader color={'#1a202c'} loading={loading} size={50} /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">{t('newsAndUpdates')}</h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search news..."
            className="p-2 border rounded w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
          {filteredNews.length === 0 ? (
            <p className="text-center text-gray-600">No news articles available.</p>
          ) : (
            filteredNews.map(item => (
              <div key={item.id} className="rounded-lg shadow-lg overflow-hidden md:flex">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full md:w-1/3 h-auto object-cover"/>}
                <div className="p-6 md:p-8">
                  <p className="text-text-primary mb-2">{item.date}</p>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">{item.title}</h3>
                  <p className="text-text-primary mb-4">{item.summary}</p>
                  <a href="#" className="text-secondary-light font-bold hover:underline">{t('readMore')}</a>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevPage}
            disabled={news.page === 0}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={filteredNews.length < 5}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;