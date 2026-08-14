import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">404</h1>
        <p className="text-sm text-gray-500 mt-2">Page not found</p>
        <Link to="/" className="text-sm text-gray-900 underline mt-4 inline-block">Go home</Link>
      </div>
    </div>
  );
}

export default NotFound;
