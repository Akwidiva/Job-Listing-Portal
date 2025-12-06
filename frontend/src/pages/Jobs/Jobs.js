import React, { useState } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: 'Senior Frontend Developer', 
      company: 'Google', 
      location: 'Bengaluru, India', 
      type: 'Full-time', 
      salary: '₹25,00,000 - ₹35,00,000', 
      posted: '2 days ago', 
      remote: true, 
      experience: 'Senior' 
    },
    { 
      id: 2, 
      title: 'React Developer', 
      company: 'Microsoft', 
      location: 'Hyderabad, India', 
      type: 'Full-time', 
      salary: '₹15,00,000 - ₹25,00,000', 
      posted: '1 day ago', 
      remote: true, 
      experience: 'Mid Level' 
    },
    { 
      id: 3, 
      title: 'UX/UI Designer', 
      company: 'Flipkart', 
      location: 'Bangalore, India', 
      type: 'Contract', 
      salary: '₹1,200 - ₹2,000/hr', 
      posted: '3 days ago', 
      remote: false, 
      experience: 'Mid Level' 
    },
    { 
      id: 4, 
      title: 'Backend Engineer', 
      company: 'Amazon', 
      location: 'Pune, India', 
      type: 'Full-time', 
      salary: '₹20,00,000 - ₹30,00,000', 
      posted: '5 days ago', 
      remote: true, 
      experience: 'Senior' 
    },
    { 
      id: 5, 
      title: 'DevOps Engineer', 
      company: 'Infosys', 
      location: 'Mumbai, India', 
      type: 'Full-time', 
      salary: '₹12,00,000 - ₹20,00,000', 
      posted: '1 week ago', 
      remote: true, 
      experience: 'Senior' 
    },
    { 
      id: 6, 
      title: 'Product Manager', 
      company: 'Swiggy', 
      location: 'Gurgaon, India', 
      type: 'Full-time', 
      salary: '₹30,00,000 - ₹45,00,000', 
      posted: '4 days ago', 
      remote: true, 
      experience: 'Senior' 
    },
    { 
      id: 7, 
      title: 'Junior Frontend Developer', 
      company: 'StartupXYZ', 
      location: 'Chennai, India', 
      type: 'Full-time', 
      salary: '₹4,00,000 - ₹8,00,000', 
      posted: '6 days ago', 
      remote: false, 
      experience: 'Entry Level' 
    },
    { 
      id: 8, 
      title: 'Data Analyst', 
      company: 'TCS', 
      location: 'Remote', 
      type: 'Part-time', 
      salary: '₹800 - ₹1,200/hr', 
      posted: '2 days ago', 
      remote: true, 
      experience: 'Mid Level' 
    },
    { 
      id: 9, 
      title: 'Mobile App Developer', 
      company: 'Zomato', 
      location: 'Delhi, India', 
      type: 'Full-time', 
      salary: '₹18,00,000 - ₹28,00,000', 
      posted: '3 days ago', 
      remote: true, 
      experience: 'Senior' 
    },
    { 
      id: 10, 
      title: 'QA Engineer', 
      company: 'Wipro', 
      location: 'Kolkata, India', 
      type: 'Full-time', 
      salary: '₹6,00,000 - ₹12,00,000', 
      posted: '1 week ago', 
      remote: false, 
      experience: 'Mid Level' 
    },
    { 
      id: 11, 
      title: 'Business Analyst', 
      company: 'HCL Technologies', 
      location: 'Noida, India', 
      type: 'Full-time', 
      salary: '₹8,00,000 - ₹15,00,000', 
      posted: '2 days ago', 
      remote: true, 
      experience: 'Mid Level' 
    },
    { 
      id: 12, 
      title: 'Cloud Architect', 
      company: 'Accenture', 
      location: 'Remote', 
      type: 'Full-time', 
      salary: '₹35,00,000 - ₹50,00,000', 
      posted: '1 day ago', 
      remote: true, 
      experience: 'Senior' 
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    experience: '',
    salaryRange: '',
    remoteOnly: false,
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearch = () => {
    // Filter jobs based on filters
    console.log('Searching with filters:', filters);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      experience: '',
      salaryRange: '',
      remoteOnly: false,
    });
  };

  // Updated salary ranges in Indian Rupees (₹)
  const salaryRanges = [
    { value: '', label: 'All Salary Ranges' },
    { value: 'under-5l', label: 'Under ₹5 LPA' },
    { value: '5l-10l', label: '₹5 - ₹10 LPA' },
    { value: '10l-15l', label: '₹10 - ₹15 LPA' },
    { value: '15l-20l', label: '₹15 - ₹20 LPA' },
    { value: '20l-30l', label: '₹20 - ₹30 LPA' },
    { value: '30l-40l', label: '₹30 - ₹40 LPA' },
    { value: '40l-50l', label: '₹40 - ₹50 LPA' },
    { value: 'over-50l', label: 'Over ₹50 LPA' },
    { value: 'hourly-under-500', label: 'Hourly: Under ₹500/hr' },
    { value: 'hourly-500-1000', label: 'Hourly: ₹500 - ₹1,000/hr' },
    { value: 'hourly-1000-1500', label: 'Hourly: ₹1,000 - ₹1,500/hr' },
    { value: 'hourly-over-1500', label: 'Hourly: Over ₹1,500/hr' },
  ];

  // Indian city options
  const indianCities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 
    'Pune', 'Gurgaon', 'Noida', 'Kolkata', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Chandigarh', 'Remote'
  ];

  return (
    <div className="jobs-container">
      {/* Jobs Header */}
      <div className="jobs-header">
        <div>
          <h1>Find Your Dream Job in India 🇮🇳</h1>
          <p>Browse {jobs.length} open positions from top Indian & MNC companies</p>
        </div>
        <div className="header-stats">
          <span className="stat">📊 {jobs.length} Jobs</span>
          <span className="stat">📍 {indianCities.length} Locations</span>
          <span className="stat">🏢 100+ Companies</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search job titles, skills, or companies"
            className="search-input"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <span role="img" aria-label="search">🔍</span> Search Jobs
          </button>
          {Object.values(filters).some(val => val !== '' && val !== false) && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
        
        <div className="filter-row">
          <select 
            className="filter-select"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations in India</option>
            {indianCities.map(city => (
              <option key={city} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
          
          <select 
            className="filter-select"
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
          
          <select 
            className="filter-select"
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="">All Experience Levels</option>
            <option value="fresher">Fresher (0-1 years)</option>
            <option value="entry">Entry Level (1-3 years)</option>
            <option value="mid">Mid Level (3-7 years)</option>
            <option value="senior">Senior (7+ years)</option>
            <option value="lead">Lead/Manager</option>
          </select>

          {/* Salary Range Filter in Indian Rupees */}
          <select 
            className="filter-select"
            value={filters.salaryRange}
            onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
          >
            {salaryRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.remoteOnly}
              onChange={(e) => handleFilterChange('remoteOnly', e.target.checked)}
            /> 
            <span role="img" aria-label="remote">🌍</span> Remote Only
          </label>
        </div>

        {/* Active Filters Display */}
        <div className="active-filters">
          {filters.location && (
            <span className="active-filter">
              📍 {filters.location.charAt(0).toUpperCase() + filters.location.slice(1)}
              <button onClick={() => handleFilterChange('location', '')}>×</button>
            </span>
          )}
          {filters.jobType && (
            <span className="active-filter">
              💼 {filters.jobType}
              <button onClick={() => handleFilterChange('jobType', '')}>×</button>
            </span>
          )}
          {filters.experience && (
            <span className="active-filter">
              🎯 {filters.experience}
              <button onClick={() => handleFilterChange('experience', '')}>×</button>
            </span>
          )}
          {filters.salaryRange && (
            <span className="active-filter">
              💰 {salaryRanges.find(r => r.value === filters.salaryRange)?.label}
              <button onClick={() => handleFilterChange('salaryRange', '')}>×</button>
            </span>
          )}
          {filters.remoteOnly && (
            <span className="active-filter">
              🌍 Remote Only
              <button onClick={() => handleFilterChange('remoteOnly', false)}>×</button>
            </span>
          )}
        </div>
      </div>

      {/* Job Listings */}
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <div className="company-logo">
                {job.company.charAt(0)}
              </div>
              <div className="job-title-section">
                <h3>{job.title}</h3>
                <div className="company-info">
                  <span className="company-name">{job.company}</span>
                  <span className="separator">•</span>
                  <span className="location">
                    {job.remote ? '🌍 Remote' : `📍 ${job.location}`}
                  </span>
                  <span className="separator">•</span>
                  <span className="experience-level">{job.experience}</span>
                </div>
              </div>
              <button className="save-btn" title="Save Job">
                <span role="img" aria-label="save">💖</span>
              </button>
            </div>

            <div className="job-details">
              <span className="job-type">{job.type}</span>
              <span className="salary">💰 {job.salary}</span>
              <span className="posted">🕒 {job.posted}</span>
            </div>

            <p className="job-description">
              {job.company} is looking for a talented {job.title.toLowerCase()} to join their team in India. 
              Must have relevant experience and skills in modern technologies...
            </p>

            <div className="job-skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Cloud</span>
            </div>

            <div className="job-card-footer">
              <button className="apply-btn">Apply Now</button>
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">4</button>
        <button className="page-btn">Next →</button>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <h2>Get Job Alerts in India 🇮🇳</h2>
        <p>Never miss an opportunity! Get notified about new jobs matching your skills across India.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button className="subscribe-btn">Subscribe to Alerts</button>
        </div>
        <p className="newsletter-note">
          🔒 We respect your privacy. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Jobs;