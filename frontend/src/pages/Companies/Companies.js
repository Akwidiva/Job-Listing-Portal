import React, { useState } from 'react';
import './Companies.css';

const Companies = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Google', logo: 'G', industry: 'Technology', jobs: 245, location: 'Mountain View, CA', rating: 4.8 },
    { id: 2, name: 'Microsoft', logo: 'M', industry: 'Technology', jobs: 189, location: 'Redmond, WA', rating: 4.7 },
    { id: 3, name: 'Apple', logo: '🍎', industry: 'Technology', jobs: 167, location: 'Cupertino, CA', rating: 4.6 },
    { id: 4, name: 'Amazon', logo: 'A', industry: 'E-commerce', jobs: 312, location: 'Seattle, WA', rating: 4.5 },
    { id: 5, name: 'Meta', logo: 'f', industry: 'Social Media', jobs: 145, location: 'Menlo Park, CA', rating: 4.4 },
    { id: 6, name: 'Netflix', logo: 'N', industry: 'Entertainment', jobs: 89, location: 'Los Gatos, CA', rating: 4.9 },
    { id: 7, name: 'Tesla', logo: 'T', industry: 'Automotive', jobs: 123, location: 'Austin, TX', rating: 4.3 },
    { id: 8, name: 'Spotify', logo: 'S', industry: 'Music', jobs: 67, location: 'New York, NY', rating: 4.7 },
  ]);

  const [filter, setFilter] = useState('all');

  return (
    <div className="companies-container">
      {/* Header */}
      <div className="companies-header">
        <div>
          <h1>Top Companies Hiring</h1>
          <p>Discover amazing companies and their open positions</p>
        </div>
        <div className="stats">
          <span className="stat">🏢 {companies.length} Companies</span>
          <span className="stat">💼 1,337 Open Positions</span>
        </div>
      </div>

      {/* Industry Filter */}
      <div className="industry-filter">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All Industries
        </button>
        <button className={`filter-btn ${filter === 'technology' ? 'active' : ''}`} onClick={() => setFilter('technology')}>
          Technology
        </button>
        <button className={`filter-btn ${filter === 'finance' ? 'active' : ''}`} onClick={() => setFilter('finance')}>
          Finance
        </button>
        <button className={`filter-btn ${filter === 'healthcare' ? 'active' : ''}`} onClick={() => setFilter('healthcare')}>
          Healthcare
        </button>
        <button className={`filter-btn ${filter === 'ecommerce' ? 'active' : ''}`} onClick={() => setFilter('ecommerce')}>
          E-commerce
        </button>
      </div>

      {/* Companies Grid */}
      <div className="companies-grid">
        {companies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-header">
              <div className="company-logo-large">
                {company.logo}
              </div>
              <div className="company-info">
                <h3>{company.name}</h3>
                <div className="company-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating">{company.rating}</span>
                </div>
              </div>
              <button className="follow-btn">+ Follow</button>
            </div>

            <div className="company-details">
              <div className="detail-item">
                <span className="detail-label">Industry:</span>
                <span className="detail-value">{company.industry}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{company.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Open Positions:</span>
                <span className="detail-value highlight">{company.jobs}</span>
              </div>
            </div>

            <div className="company-jobs">
              <h4>Popular Roles:</h4>
              <div className="job-tags">
                <span className="job-tag">Software Engineer</span>
                <span className="job-tag">Product Manager</span>
                <span className="job-tag">Data Scientist</span>
              </div>
            </div>

            <div className="company-footer">
              <a href={`/company/${company.id}`} className="view-company-btn">
                View Company Profile
              </a>
              <a href={`/jobs?company=${company.name}`} className="view-jobs-btn">
                View {company.jobs} Jobs →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Companies */}
      <div className="featured-section">
        <h2>🚀 Featured Companies</h2>
        <div className="featured-companies">
          <div className="featured-company">
            <div className="featured-logo">🚀</div>
            <div>
              <h3>Fast Growing Startups</h3>
              <p>Join innovative companies changing the world</p>
            </div>
          </div>
          <div className="featured-company">
            <div className="featured-logo">🏆</div>
            <div>
              <h3>Best Places to Work 2024</h3>
              <p>Companies with highest employee satisfaction</p>
            </div>
          </div>
          <div className="featured-company">
            <div className="featured-logo">🌍</div>
            <div>
              <h3>Remote-First Companies</h3>
              <p>Work from anywhere in the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;