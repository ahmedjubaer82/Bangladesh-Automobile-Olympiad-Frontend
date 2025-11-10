import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const ManageQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsList);
    } catch (err) {
      setError('Failed to fetch questions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOrUpdateQuestion = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (options.some(opt => opt.trim() === '')) {
      setError('All options must be filled.');
      setLoading(false);
      return;
    }

    try {
      const questionData = {
        questionText,
        options,
        correctOptionIndex: parseInt(correctOptionIndex),
      };

      if (editingId) {
        const questionDoc = doc(db, 'questions', editingId);
        await updateDoc(questionDoc, questionData);
      } else {
        await addDoc(collection(db, 'questions'), questionData);
      }
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectOptionIndex(0);
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      setError('Failed to save question: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setQuestionText(item.questionText);
    setOptions(item.options);
    setCorrectOptionIndex(item.correctOptionIndex);
  };

  const handleDelete = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const questionDoc = doc(db, 'questions', id);
      await deleteDoc(questionDoc);
      fetchQuestions();
    } catch (err) {
      setError('Failed to delete question: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-text-primary">Manage Questions</h2>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && <p className="text-center mb-4">Loading...</p>}

          <form onSubmit={handleAddOrUpdateQuestion} className="mb-10 p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">{editingId ? 'Edit Question' : 'Add New Question'}</h3>
            <div className="mb-4">
              <label htmlFor="questionText" className="block text-text-primary font-bold mb-2">Question Text</label>
              <textarea 
                id="questionText" 
                rows="4" 
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" 
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-text-primary font-bold mb-2">Options</label>
              {options.map((option, index) => (
                <input 
                  key={index}
                  type="text" 
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light mb-2"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor="correctOption" className="block text-text-primary font-bold mb-2">Correct Option</label>
              <select 
                id="correctOption" 
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light"
                value={correctOptionIndex}
                onChange={(e) => setCorrectOptionIndex(parseInt(e.target.value))}
              >
                {options.map((option, index) => (
                  <option key={index} value={index}>{`Option ${index + 1}: ${option}`}</option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-secondary-light text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition duration-300 transform hover:scale-105">
                {editingId ? 'Update Question' : 'Add Question'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setQuestionText(''); setOptions(['', '', '', '']); setCorrectOptionIndex(0); }} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <h3 className="text-2xl font-bold mb-4 text-text-primary">Current Questions</h3>
          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-center text-gray-600">No questions found.</p>
            ) : (
              questions.map(item => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <h4 className="font-bold text-lg text-text-primary">{item.questionText}</h4>
                  <ul className="list-disc list-inside ml-4">
                    {item.options.map((option, index) => (
                      <li key={index} className={index === item.correctOptionIndex ? 'text-green-600 font-medium' : 'text-text-primary'}>
                        {option}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <button onClick={() => handleEdit(item)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>
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

export default ManageQuestionsPage;
