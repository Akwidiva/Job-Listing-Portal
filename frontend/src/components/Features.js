import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Smart Search Engine',
      description: 'Find the perfect role instantly with intelligent filters and AI-powered suggestions.'
    },
    {
      icon: '📄',
      title: 'Instant Apply',
      description: 'Apply to multiple jobs in seconds—no repetitive forms, no hassle.'
    },
    {
      icon: '🔔',
      title: 'Real-Time Alerts',
      description: 'Stay ahead with instant notifications for new openings that match your profile.'
    },
    {
      icon: '📊',
      title: 'Career Analytics',
      description: 'Access salary insights, company ratings, and growth charts to make confident decisions.'
    },
    {
      icon: '🤝',
      title: 'Pro Networking',
      description: 'Build meaningful connections with HRs, recruiters, and industry professionals.'
    },
    {
      icon: '🎯',
      title: 'Personalized Guidance',
      description: 'AI-powered career pathing to help you choose the right direction for your future.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">🚀 Why Choose <span className="highlight">Skillora?</span></h2>
          <p className="section-subtitle">Tools, insights, and features built for your success</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
