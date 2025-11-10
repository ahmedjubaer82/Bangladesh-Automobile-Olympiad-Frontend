import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';

import imageCompression from 'browser-image-compression';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const RegistrationPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      institution: '',
      profilePic: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      phone: Yup.string(),
      address: Yup.string(),
      institution: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError('');

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        let photoURL = '';
        if (values.profilePic) {
          const storageRef = ref(storage, `profile-pics/${user.uid}/${values.profilePic.name}`);
          await uploadBytes(storageRef, values.profilePic);
          photoURL = await getDownloadURL(storageRef);
        }

        await updateProfile(user, {
          displayName: values.name,
          photoURL: photoURL,
        });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: values.name,
          email: user.email,
          phoneNumber: values.phone,
          address: values.address,
          institution: values.institution,
          photoURL: photoURL,
          role: 'student',
        });

        toast.success('Registration successful!');
        navigate('/');
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      formik.setFieldValue("profilePic", compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
      setError('Failed to compress image.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Student Registration</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              id="phone"
              type="tel"
              {...formik.getFieldProps('phone')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              id="address"
              type="text"
              {...formik.getFieldProps('address')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Institution</label>
            <input
              id="institution"
              type="text"
              {...formik.getFieldProps('institution')}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <input
              id="profilePic"
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
