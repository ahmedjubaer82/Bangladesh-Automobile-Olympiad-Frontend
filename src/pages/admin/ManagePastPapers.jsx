import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase';

const ManagePastPapers = () => {
  const [file, setFile] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const storageRef = ref(storage, `past-papers/${file.name}`);
      await uploadBytes(storageRef, file);
      await fetchPapers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const listRef = ref(storage, 'past-papers');
      const res = await listAll(listRef);
      const paperList = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setPapers(paperList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paperName) => {
    setLoading(true);
    try {
      const paperRef = ref(storage, `past-papers/${paperName}`);
      await deleteObject(paperRef);
      await fetchPapers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Past Papers</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
        <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded ml-2" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Uploaded Papers</h2>
        {loading && <p>Loading papers...</p>}
        <ul>
          {papers.map((paper) => (
            <li key={paper.name} className="flex justify-between items-center p-2 border-b">
              <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {paper.name}
              </a>
              <button onClick={() => handleDelete(paper.name)} className="bg-red-500 text-white p-1 rounded" disabled={loading}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePastPapers;
