import React, { useState } from 'react';
import './JobListings.css';

function JobListings() {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted: '2 days ago',
      logo: '🧩',
      tags: ['React', 'JavaScript', 'Remote']
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'DataWorks LLC',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '1 day ago',
      logo: '📡',
      tags: ['Python', 'Machine Learning', 'SQL']
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'CreativeMinds',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$90,000 - $120,000',
      posted: '3 days ago',
      logo: '🖌️',
      tags: ['Figma', 'Sketch', 'UI/UX']
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      posted: '5 days ago',
      logo: '🛠️',
      tags: ['AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$140,000 - $180,000',
      posted: '1 week ago',
      logo: '🚀',
      tags: ['Product', 'Strategy', 'Agile']
    },
    {
      id: 6,
      title: 'Backend Developer',
      company: 'ServerStack',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      posted: '4 days ago',
      logo: '🔗',
      tags: ['Node.js', 'Python', 'API']
    }
  ]);

  const [visibleJobs, setVisibleJobs] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', emoji: '✨' },
    { name: 'Tech', emoji: '💻' },
    { name: 'Design', emoji: '🎨' },
    { name: 'Business', emoji: '📈' },
    { name: 'Remote', emoji: '🌍' },
    { name: 'Finance', emoji: '💰' }
  ];

  const loadMoreJobs = () => setVisibleJobs(prev => prev + 3);

  return (
    <section className="job-listings" id="jobs">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            🚀 Trending Job Opportunities
          </h2>
          <p className="section-subtitle">
            Explore high-growth roles curated just for you
          </p>
        </div>

        {/* Filters */}
        <div className="filter-categories">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`filter-btn ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="jobs-grid">
          {jobs.slice(0, visibleJobs).map(job => (
            <div key={job.id} className="job-card">

              {/* Header */}
              <div className="job-header">
                <div className="company-logo">
                  <span className="logo-icon">{job.logo}</span>
                </div>

                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="company-info">
                    <span className="company-name">{job.company}</span>
                    <span className="location">📍 {job.location}</span>
                  </div>
                </div>

                <button className="save-btn" title="Save Job">❤️</button>
              </div>

              {/* Details */}
              <div className="job-details">
                <span className="job-type">📌 {job.type}</span>
                <span className="job-salary">💵 {job.salary}</span>
                <span className="job-posted">⏳ {job.posted}</span>
              </div>

              {/* Tags */}
              <div className="job-tags">
                {job.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {/* Buttons */}
              <div className="job-actions">
                <button className="apply-btn">⚡ Quick Apply</button>
                <button className="view-btn">🔎 View Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleJobs < 12 && (
          <div className="load-more">
            <button onClick={loadMoreJobs} className="load-more-btn">
              📥 Load More Jobs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobListings;
