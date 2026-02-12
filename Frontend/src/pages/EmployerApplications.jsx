import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import EmployerSidebar from "../components/employersidebar";

export default function EmployerApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("/api/applications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setApplications(data.applications || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const updateStatus = async (appId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <EmployerSidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to="/employer-dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Applications</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Applications</h1>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-600">No applications yet.</p>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Applicant</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Job</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Applied</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Status</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-gray-900">{app.applicant?.name || "Unknown"}</p>
                          <p className="text-gray-500 text-sm">{app.applicant?.email}</p>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{app.job?.title || "Unknown"}</td>
                        <td className="py-4 px-6 text-gray-600 text-sm">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={app.status}
                            onChange={(e) => updateStatus(app._id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
