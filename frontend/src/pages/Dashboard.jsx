import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/layout/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import StatusBadge from "../components/applications/StatusBadge";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchApplications();
  }, []);

  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "Interview").length;
  const offers = applications.filter((a) => a.status === "Offer").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  const recent = applications.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <Link
            to="/applications"
            className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800"
          >
            Add Application
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard label="Total Applications" value={total} />
              <StatsCard label="Interviews" value={interviews} />
              <StatsCard label="Offers" value={offers} />
              <StatsCard label="Rejected" value={rejected} />
            </div>

            <div className="border border-gray-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-900">Recent Applications</h2>
              </div>

              {recent.length === 0 ? (
                <p className="text-sm text-gray-500 px-4 py-6">
                  No applications yet.{" "}
                  <Link to="/applications" className="underline">Add your first one</Link>
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {recent.map((app) => (
                    <li key={app._id} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{app.company}</p>
                        <p className="text-xs text-gray-500">{app.role}</p>
                      </div>
                      <StatusBadge status={app.status} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;