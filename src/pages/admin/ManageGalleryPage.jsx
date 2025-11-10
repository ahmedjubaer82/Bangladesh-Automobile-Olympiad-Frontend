import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const ManageGalleryPage = () => {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageAlt, setImageAlt] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const imagesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imagesList);
    } catch (err) {
      setError('Failed to fetch images: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `gallery_images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!imageFile) {
      setError('Please select an image to upload.');
      setLoading(false);
      return;
    }

    try {
      const downloadURL = await handleImageUpload(imageFile);
      await addDoc(collection(db, 'gallery'), {
        imageUrl: downloadURL,
        alt: imageAlt || 'Gallery Image',
        uploadedAt: new Date().toISOString(),
      });
      setImageFile(null);
      setImageAlt('');
      fetchImages();
    } catch (err) {
      setError('Failed to upload image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id, imageUrlToDelete) => {
    setError(null);
    setLoading(true);
    try {
      // Delete image from storage
      const imageRef = ref(storage, imageUrlToDelete);
      await deleteObject(imageRef).catch((error) => {
        // If the file doesn't exist, we can ignore the error
        if (error.code !== 'storage/object-not-found') {
          throw error;
        }
      });
      // Delete document from Firestore
      const imageDoc = doc(db, 'gallery', id);
      await deleteDoc(imageDoc);
      fetchImages();
    } catch (err) {
      setError('Failed to delete image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };



  const seedDemoGallery = async () => {
    const demoImages = [
      {
        imageUrl: 'https://picsum.photos/seed/bao1/400/300',
        alt: 'Car Engine',
        uploadedAt: new Date().toISOString(),
      },
      {
        imageUrl: 'https://picsum.photos/seed/bao2/400/300',
        alt: 'Modern Car Interior',
        uploadedAt: new Date().toISOString(),
      },
      {
        imageUrl: 'https://picsum.photos/seed/bao3/400/300',
        alt: 'Electric Car Charging',
        uploadedAt: new Date().toISOString(),
      },
      {
        imageUrl: 'https://picsum.photos/seed/bao4/400/300',
        alt: 'Vintage Car',
        uploadedAt: new Date().toISOString(),
      },
    ];

    setLoading(true);
    try {
      for (const image of demoImages) {
        await addDoc(collection(db, 'gallery'), image);
      }
      fetchImages();
    } catch (err) {
      setError('Failed to seed gallery: ' + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-text-primary">Manage Gallery</h2>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && <p className="text-center mb-4">Loading...</p>}

          <form onSubmit={handleAddImage} className="mb-10 p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">Upload New Image</h3>
            <div className="mb-4">
              <label htmlFor="imageFile" className="block text-text-primary font-bold mb-2">Image File</label>
              <input 
                type="file" 
                id="imageFile" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageAlt" className="block text-text-primary font-bold mb-2">Image Description (Alt Text)</label>
              <input 
                type="text" 
                id="imageAlt" 
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" 
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-secondary-light text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition duration-300 transform hover:scale-105">
                Upload Image
              </button>
            </div>
          </form>

          <h3 className="text-2xl font-bold mb-4 text-text-primary">Current Gallery Images</h3>
          <div className="text-center mb-4">
            <button onClick={seedDemoGallery} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">Seed Gallery</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">No gallery images found.</p>
            ) : (
              images.map(img => (
                <div key={img.id} className="relative rounded-lg shadow-lg overflow-hidden">
                  <img src={img.imageUrl} alt={img.alt} className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-sm">
                    <p className="truncate">{img.alt}</p>
                    <button 
                      onClick={() => handleDeleteImage(img.id, img.imageUrl)} 
                      className="mt-1 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded-full"
                    >
                      Delete
                    </button>
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

export default ManageGalleryPage;
