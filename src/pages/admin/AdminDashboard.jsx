import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import AddAdmin from './AddAdmin';

const AdminDashboard = () => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-text-primary">Admin Dashboard</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link to="/admin/news" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center">Manage News</Link>
            <Link to="/admin/gallery" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center">Manage Gallery</Link>
            <Link to="/admin/questions" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center">Manage Questions</Link>
            <Link to="/admin/past-papers" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center">Manage Past Papers</Link>
          </div>
          <div className="mb-8">
            <AddAdmin />
          </div>
          <div className="text-center">
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
