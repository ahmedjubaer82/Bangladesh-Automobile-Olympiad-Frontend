import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

const StudentLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin123') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: 'Admin',
              email: user.email,
              role: 'admin',
            });
          } catch (createError) {
            setError(createError.message);
            toast.error(createError.message);
            return;
          }
        } else {
          setError(error.message);
          toast.error(error.message);
          return;
        }
      }
      toast.success('Admin logged in successfully!');
      navigate('/admin/dashboard');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        toast.success('Logged in successfully!');
        if (docSnap.exists() && docSnap.data().role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/profile');
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Student Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Don't have an account? <a href="/registration" className="text-blue-500 hover:underline">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;