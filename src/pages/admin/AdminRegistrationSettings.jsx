import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const AdminRegistrationSettings = () => {
  const [isAdminRegistrationEnabled, setIsAdminRegistrationEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'adminRegistration');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsAdminRegistrationEnabled(docSnap.data().enabled);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const newSetting = !isAdminRegistrationEnabled;
      const docRef = doc(db, 'settings', 'adminRegistration');
      await setDoc(docRef, { enabled: newSetting });
      setIsAdminRegistrationEnabled(newSetting);
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Admin Registration</h3>
      <p className="mb-2">
        {isAdminRegistrationEnabled ? 'Admin registration is currently enabled.' : 'Admin registration is currently disabled.'}
      </p>
      <button
        onClick={handleToggle}
        className={`w-full p-2 rounded ${isAdminRegistrationEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        disabled={loading}
      >
        {loading ? 'Updating...' : (isAdminRegistrationEnabled ? 'Disable Admin Registration' : 'Enable Admin Registration')}
      </button>
    </div>
  );
};

export default AdminRegistrationSettings;
