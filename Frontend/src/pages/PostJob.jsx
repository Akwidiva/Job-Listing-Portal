import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import EmployerSidebar from "../components/employersidebar";

export default function PostJob() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    type: "Full-time",
    description: "",
    qualifications: "",
    responsibilities: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        ...formData,
        qualifications: formData.qualifications.split("\n").filter(Boolean),
        responsibilities: formData.responsibilities.split("\n").filter(Boolean),
      };

      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to post job");
        return;
      }

      navigate("/employer-dashboard");
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <EmployerSidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to="/employer-dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Post New Job</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Job</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 rounded-lg p-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Remote, New York, NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Salary Range</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. $80k - $120k"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role, team, and what makes this opportunity exciting..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Qualifications (one per line)</label>
                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="3+ years experience with React&#10;Strong TypeScript skills&#10;..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Responsibilities (one per line)</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Build and maintain frontend applications&#10;Collaborate with design team&#10;..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Posting..." : "Post Job"}
                </button>
                <Link
                  to="/employer-dashboard"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
