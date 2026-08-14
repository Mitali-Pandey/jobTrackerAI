import { useState } from "react";
import api from "../../api/axios";

function ApplicationForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    link: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/applications", formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm text-gray-700 mb-1">Company</label>
        <input
          type="text"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="e.g. Google"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Role</label>
        <input
          type="text"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="e.g. SDE Intern"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Job Link (optional)</label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Notes (optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Any notes about this application"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Application"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-600 px-4 py-2 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;