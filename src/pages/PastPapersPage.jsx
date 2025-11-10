import { useState, useEffect, useCallback } from 'react';
import { ref, list, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const PastPapersPage = () => {
  const [papers, setPapers] = useState({ list: [], page: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageTokens, setPrevPageTokens] = useState([]);

  const fetchPapers = useCallback(async (pageToken) => {
    setLoading(true);
    try {
      const listRef = ref(storage, 'past-papers');
      const res = await list(listRef, { maxResults: 10, pageToken });
      const paperList = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setPapers((prev) => ({ ...prev, list: paperList }));
      setNextPageToken(res.nextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const handleNextPage = () => {
    if (nextPageToken) {
      setPrevPageTokens([...prevPageTokens, papers.page]);
      setPapers((prev) => ({ ...prev, page: prev.page + 1 }));
      fetchPapers(nextPageToken);
    }
  };

  const handlePrevPage = () => {
    if (papers.page > 0) {
      const prevPageToken = prevPageTokens.pop();
      setPrevPageTokens([...prevPageTokens]);
      setPapers((prev) => ({ ...prev, page: prev.page - 1 }));
      fetchPapers(prevPageToken);
    }
  };

  const filteredPapers = papers.list.filter((paper) =>
    paper.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Past Papers</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search papers..."
          className="p-2 border rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p>Loading papers...</p>}
      <ul>
        {filteredPapers.map((paper) => (
          <li key={paper.name} className="p-2 border-b">
            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {paper.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={papers.page === 0}
          className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPageToken}
          className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PastPapersPage;