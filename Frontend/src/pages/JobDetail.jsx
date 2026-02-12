import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data.job);
      } catch (err) {
        console.error(err);
        navigate("/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setApplying(true);
    try {
      const res = await fetch(`/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId: id }),
      });
      if (res.ok) setApplied(true);
    } catch (err) {
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!job) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/jobs" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Jobs
          </Link>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-gray-600 text-lg">{job.company}</p>
            <p className="text-gray-500 mt-1">{job.location}</p>
            {job.salaryRange && <p className="text-green-600 mt-2 font-medium">{job.salaryRange}</p>}

            <h2 className="text-xl font-semibold mt-6 mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>

            {job.qualifications?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6 mb-2">Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {job.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </>
            )}

            {job.responsibilities?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6 mb-2">Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            <button
              onClick={handleApply}
              disabled={applying || applied}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 transition-colors"
            >
              {applied ? "Applied!" : applying ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
