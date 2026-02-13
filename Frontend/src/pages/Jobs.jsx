import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import JobSeekerSidebar from "../components/jobseekersidebar";

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isJobSeeker, setIsJobSeeker] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setIsJobSeeker(userData.userType === "job-seeker");
      } catch (e) {}
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (location) params.append("location", location);
      if (type) params.append("type", type);
      params.append("page", page);
      params.append("limit", 10);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        {isJobSeeker && <JobSeekerSidebar />}
        <main className="flex-1 py-10 overflow-auto">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Jobs</h1>

            {/* Search / Filter */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Job title, company, or keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full sm:w-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full sm:w-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Search
              </button>
            </form>

            {/* Job Listings */}
            {loading ? (
              <p className="text-gray-600">Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="text-gray-600">No jobs found.</p>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                      </div>
                      {job.salaryRange && (
                        <span className="text-green-600 font-medium">{job.salaryRange}</span>
                      )}
                    </div>
                    <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      p === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
