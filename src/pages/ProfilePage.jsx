import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

import { ClipLoader } from 'react-spinners';

const ProfilePage = () => {
  const { currentUser, userData, loading, refreshUserData } = useAuth();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneUpdate = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Phone number cannot be empty.');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), { phoneNumber: phone });
      await refreshUserData();
      setPhone('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100"><ClipLoader color={'#1a202c'} loading={loading} size={50} /></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100"><p className="text-red-500">{error}</p></div>;
  }

  if (!currentUser || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">{userData.isAdmin ? 'Admin Profile' : 'Student Profile'}</h1>
        {userData.photoURL && (
          <img
            src={userData.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <p className="text-xl mb-2"><strong>Name:</strong> {userData.displayName}</p>
        <p className="text-xl mb-2"><strong>Email:</strong> {userData.email}</p>
        {!userData.isAdmin && (
          <>
            {userData.address && <p className="text-xl mb-2"><strong>Address:</strong> {userData.address}</p>}
            {userData.institution && <p className="text-xl mb-2"><strong>Institution:</strong> {userData.institution}</p>}
            {userData.phoneNumber ? (
              <p className="text-xl mb-2"><strong>Phone:</strong> {userData.phoneNumber}</p>
            ) : (
              <form onSubmit={handlePhoneUpdate} className="mt-4">
                <label className="block text-gray-700 mb-2">Add your phone number:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2">
                  Save Phone Number
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;