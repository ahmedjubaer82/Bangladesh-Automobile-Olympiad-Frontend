import { useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error('User not found.');
      } else {
        querySnapshot.forEach(async (userDoc) => {
          await updateDoc(doc(db, 'users', userDoc.id), { role: 'admin' });
          toast.success(`User ${email} is now an admin.`);
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Add Admin</h3>
      <form onSubmit={handleAddAdmin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">User Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? 'Adding Admin...' : 'Add Admin'}
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
