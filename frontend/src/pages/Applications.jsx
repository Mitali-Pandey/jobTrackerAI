import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/layout/Navbar";
import Modal from "../components/ui/Modal";
import ApplicationForm from "../components/applications/ApplicationForm";
import StatusBadge from "../components/applications/StatusBadge";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications");
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    try {
      await api.delete(`/applications/${id}`);
      setApplications(applications.filter((a) => a._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchApplications();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-900">Applications</h1>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800"
          >
            Add Application
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : applications.length === 0 ? (
          <div className="border border-gray-200 rounded bg-white p-8 text-center">
            <p className="text-sm text-gray-500">No applications yet.</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Match Score</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{app.company}</td>
                    <td className="px-4 py-3 text-gray-600">{app.role}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {app.matchScore !== null ? `${app.matchScore}%` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <Link
                        to={`/applications/${app._id}`}
                        className="text-gray-600 hover:text-gray-900 text-xs"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Application">
        <ApplicationForm onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}

export default Applications;