import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">JobTrackr</h1>
        <p className="text-sm text-gray-500 mt-2">Track your job applications in one place</p>
        <div className="mt-6 space-x-3">
          <Link to="/login" className="text-sm text-gray-900 underline">Sign in</Link>
          <Link to="/register" className="text-sm text-gray-900 underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;