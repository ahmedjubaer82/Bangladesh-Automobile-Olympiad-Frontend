import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { toast } from 'react-toastify';

const ManageNewsPage = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const newsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsList);
    } catch (err) {
      setError('Failed to fetch news: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `news_images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleAddOrUpdateNews = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let newImageUrl = imageUrl;
      if (image) {
        newImageUrl = await handleImageUpload(image);
      }

      const newsData = {
        title,
        summary,
        imageUrl: newImageUrl,
        date: new Date().toISOString().split('T')[0], // Current date
      };

      if (editingId) {
        const newsDoc = doc(db, 'news', editingId);
        await updateDoc(newsDoc, newsData);
        toast.success('News article updated successfully!');
      } else {
        await addDoc(collection(db, 'news'), newsData);
        toast.success('News article added successfully!');
      }
      setTitle('');
      setSummary('');
      setImage(null);
      setImageUrl('');
      setEditingId(null);
      fetchNews();
    } catch (err) {
      setError('Failed to save news: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSummary(item.summary);
    setImageUrl(item.imageUrl);
    setImage(null); // Clear image input when editing
  };

  const handleDelete = async (id, imageUrlToDelete) => {
    setError(null);
    setLoading(true);
    try {
      // Delete image from storage if it exists
      if (imageUrlToDelete) {
        const imageRef = ref(storage, imageUrlToDelete);
        await deleteObject(imageRef).catch((error) => {
          // If the file doesn't exist, we can ignore the error
          if (error.code !== 'storage/object-not-found') {
            throw error;
          }
        });
      }
      // Delete document from Firestore
      const newsDoc = doc(db, 'news', id);
      await deleteDoc(newsDoc);
      fetchNews();
      toast.success('News article deleted successfully!');
    } catch (err) {
      setError('Failed to delete news: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const seedDemoNews = async () => {
    const demoNews = [
      {
        title: 'Bangladesh Automobile Olympiad 2025 Announced',
        summary: 'The most anticipated event for automobile enthusiasts in Bangladesh is back! The 2025 Bangladesh Automobile Olympiad will be held in Dhaka. Registrations are now open.',
        imageUrl: 'https://via.placeholder.com/400x200.png?text=BAO+2025',
        date: '2025-10-26',
      },
      {
        title: 'Workshops on Electric Vehicles to be Held',
        summary: 'As part of the Olympiad, there will be a series of workshops on electric vehicles (EVs). Industry experts will share their knowledge and insights on the future of mobility.',
        imageUrl: 'https://via.placeholder.com/400x200.png?text=EV+Workshop',
        date: '2025-10-20',
      },
      {
        title: 'Last Year\'s Winner Shares His Success Story',
        summary: 'We had a chat with the winner of the 2024 Bangladesh Automobile Olympiad, who shared his journey and tips for aspiring participants.',
        imageUrl: 'https://via.placeholder.com/400x200.png?text=Success+Story',
        date: '2025-10-15',
      },
    ];

    setLoading(true);
    try {
      for (const newsItem of demoNews) {
        await addDoc(collection(db, 'news'), newsItem);
      }
      fetchNews();
    } catch (err) {
      setError('Failed to seed news: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-text-primary">Manage News</h2>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && <p className="text-center mb-4">Loading...</p>}

          <form onSubmit={handleAddOrUpdateNews} className="mb-10 p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">{editingId ? 'Edit News' : 'Add New News'}</h3>
            <div className="mb-4">
              <label htmlFor="newsTitle" className="block text-text-primary font-bold mb-2">Title</label>
              <input 
                type="text" 
                id="newsTitle" 
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newsSummary" className="block text-text-primary font-bold mb-2">Summary</label>
              <textarea 
                id="newsSummary" 
                rows="4" 
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="newsImage" className="block text-text-primary font-bold mb-2">Image</label>
              <input 
                type="file" 
                id="newsImage" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {imageUrl && !image && <p className="text-sm text-gray-600 mt-2">Current Image: <a href={imageUrl} target="_blank" rel="noopener noreferrer">View</a></p>}
            </div>
            <div className="text-center">
              <button type="submit" className="bg-secondary-light text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition duration-300 transform hover:scale-105">
                {editingId ? 'Update News' : 'Add News'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setTitle(''); setSummary(''); setImage(null); setImageUrl(''); }} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <h3 className="text-2xl font-bold mb-4 text-text-primary">Current News Articles</h3>
          <div className="text-center mb-4">
            <button onClick={seedDemoNews} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">Seed News</button>
          </div>
          <div className="space-y-4">
            {news.length === 0 ? (
              <p className="text-center text-gray-600">No news articles found.</p>
            ) : (
              news.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-bold text-lg text-text-primary">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(item)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2">Edit</button>
                    <button onClick={() => handleDelete(item.id, item.imageUrl)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNewsPage;
