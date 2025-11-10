import { useLocation, Link } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const { errorCode, errorMessage } = location.state || { errorCode: 404, errorMessage: 'Page not found' };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error {errorCode}</h1>
        <p className="text-lg text-gray-700 mb-8">{errorMessage}</p>
        <Link to="/" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
