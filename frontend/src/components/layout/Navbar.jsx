import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-sm font-semibold text-gray-900">
          JobTrackr
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link to="/applications" className="text-gray-600 hover:text-gray-900">
            Applications
          </Link>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <span className="text-gray-500">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;