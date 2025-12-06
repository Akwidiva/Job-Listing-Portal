import React, { useState } from 'react';
import './Hero.css';

function Hero() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'tech', icon: '💻', label: 'Tech', count: '1,234' },
    { id: 'design', icon: '🎨', label: 'Design', count: '456' },
    { id: 'business', icon: '📊', label: 'Business', count: '789' },
    { id: 'marketing', icon: '📈', label: 'Marketing', count: '321' },
    { id: 'remote', icon: '🏠', label: 'Remote', count: '654' }
  ];

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        
        {/* Animated Background Shapes */}
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Main Content */}
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Work That
              <span className="title-highlight">Fits</span>
              Your Life
            </h1>
            
            <p className="hero-description">
              Discover opportunities that align with your skills, schedule, and ambitions. 
              No more settling—just the right fit.
            </p>
          </div>

          {/* Clean Search Bar */}
          <div className="hero-search">
            <div className="search-wrapper">
              <div className="search-input-group">
                <input 
                  type="text" 
                  placeholder="What role are you looking for?"
                  className="search-input"
                />
                <div className="search-divider"></div>
                <input 
                  type="text" 
                  placeholder="Where? (City, Remote, Hybrid)"
                  className="search-input"
                />
              </div>
              <button className="search-button">
                <span className="search-icon">→</span>
                <span className="search-text">Find Jobs</span>
              </button>
            </div>
          </div>

          {/* Category Cards */}
          <div className="hero-categories">
            <div className="categories-header">
              <h3>Browse by Focus</h3>
              <button className="view-all">View All →</button>
            </div>
            
            <div className="categories-grid">
              {categories.map(category => (
                <div 
                  key={category.id}
                  className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-content">
                    <h4>{category.label}</h4>
                    <p>{category.count} openings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">2K+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24H</div>
              <div className="stat-label">Fast Apply</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;