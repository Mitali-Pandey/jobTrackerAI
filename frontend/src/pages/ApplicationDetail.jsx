import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/layout/Navbar";
import StatusBadge from "../components/applications/StatusBadge";

function ApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get(`/applications/${id}`);
        setApplication(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");

    if (!resumeFile) {
      setError("Please upload your resume (PDF)");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const res = await api.post(`/ai/match/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
      setApplication({ ...application, matchScore: res.data.matchScore });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze resume");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="text-sm text-gray-500 p-8">Loading...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="text-sm text-gray-500 p-8">Application not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/applications" className="text-sm text-gray-500 hover:text-gray-900">
          Back to Applications
        </Link>

        <div className="border border-gray-200 rounded bg-white p-5 mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{application.company}</h1>
              <p className="text-sm text-gray-500">{application.role}</p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          {application.link && (
            <a href={application.link} target="_blank" rel="noreferrer" className="text-sm text-gray-500 underline mt-2 inline-block">View job posting</a>
          )}

          {application.notes && (
            <p className="text-sm text-gray-600 mt-3 border-t border-gray-100 pt-3">
              {application.notes}
            </p>
          )}

          {application.matchScore !== null && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-500">Current Match Score</p>
              <p className="text-2xl font-semibold text-gray-900">{application.matchScore}%</p>
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded bg-white p-5 mt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">AI Resume Match</h2>
          <p className="text-xs text-gray-500 mb-4">
            Upload your resume and paste the job description to get an AI-generated match score.
          </p>

          <form onSubmit={handleAnalyze} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-1">Resume (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Job Description</label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              {analyzing ? "Analyzing..." : "Analyze Match"}
            </button>
          </form>

          {result && (
            <div className="mt-6 border-t border-gray-100 pt-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500">Match Score</p>
                <p className="text-3xl font-semibold text-gray-900">{result.matchScore}%</p>
              </div>

              {result.missingKeywords?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Missing Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.feedback && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Feedback</p>
                  <p className="text-sm text-gray-700">{result.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;