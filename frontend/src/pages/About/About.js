import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    seekers: 0,
    companies: 0,
    jobs: 0,
    satisfaction: 0
  });

  // Animate numbers on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter('seekers', 50000, 2000);
            animateCounter('companies', 2500, 1800);
            animateCounter('jobs', 100000, 2500);
            animateCounter('satisfaction', 95, 1500);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const animateCounter = (type, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setAnimatedNumbers(prev => ({
        ...prev,
        [type]: Math.floor(start)
      }));
    }, 16);
  };

  const handleFeatureHover = (e) => {
    const icon = e.currentTarget.querySelector('.feature-icon');
    icon.style.transform = `rotateY(${Math.random() * 360}deg) scale(1.2)`;
  };

  const handleFeatureLeave = (e) => {
    const icon = e.currentTarget.querySelector('.feature-icon');
    icon.style.transform = 'rotateY(0deg) scale(1)';
  };

  return (
    <div className="about-container">
      {/* Floating particles background */}
      <div className="particles-background">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}></div>
        ))}
      </div>

      {/* Hero Section with 3D effect */}
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Redefining</span>
            <span className="hero-subtitle">Career Success</span>
          </h1>
          <p className="hero-description">
            Where talent meets opportunity in the most innovative way possible.
            Skillora is not just a platform—it's a career transformation engine.
          </p>
          <div className="hero-badge">
            <span className="badge-text">Est. 2024</span>
            <div className="badge-sparkle">✨</div>
          </div>
        </div>
        
        {/* 3D Floating elements */}
        <div className="floating-elements">
          <div className="float-element element-1">💼</div>
          <div className="float-element element-2">🚀</div>
          <div className="float-element element-3">🌟</div>
          <div className="float-element element-4">🎯</div>
        </div>
      </div>

      {/* Mission Statement with Reveal Animation */}
      <section className="mission-section reveal-section">
        <div className="mission-card">
          <div className="mission-icon">🎯</div>
          <div className="mission-content">
            <h2 className="section-title">
              Our <span className="highlight">Mission</span>
            </h2>
            <p className="mission-statement">
              To democratize career opportunities through intelligent matching, 
              creating a world where everyone finds work that inspires them daily.
            </p>
            <div className="mission-stats">
              <div className="mini-stat">
                <span className="mini-number">24/7</span>
                <span className="mini-label">Active Matching</span>
              </div>
              <div className="mini-stat">
                <span className="mini-number">AI</span>
                <span className="mini-label">Powered</span>
              </div>
              <div className="mini-stat">
                <span className="mini-number">100%</span>
                <span className="mini-label">Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">
            The <span className="gradient-text">Skillora</span> Advantage
          </h2>
          <p className="section-subtitle">Why we're different from the rest</p>
        </div>
        
        <div className="features-grid-3d">
          {[
            {
              icon: "🧠",
              title: "AI-Powered Matching",
              description: "Our proprietary algorithm analyzes 50+ data points to find your perfect match",
              color: "blue"
            },
            {
              icon: "📈",
              title: "Real-Time Analytics",
              description: "Track applications, interview success rates, and market trends live",
              color: "purple"
            },
            {
              icon: "🎭",
              title: "Smart Profile",
              description: "Dynamic profile that evolves with your career journey automatically",
              color: "green"
            },
            {
              icon: "🤖",
              title: "Career Assistant",
              description: "24/7 AI assistant for resume optimization and interview prep",
              color: "orange"
            },
            {
              icon: "🔒",
              title: "Privacy First",
              description: "Your data stays yours. We never sell your information",
              color: "red"
            },
            {
              icon: "🌍",
              title: "Global Network",
              description: "Connect with opportunities across 50+ countries worldwide",
              color: "pink"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`feature-card feature-${feature.color}`}
              onMouseEnter={handleFeatureHover}
              onMouseLeave={handleFeatureLeave}
            >
              <div className="feature-card-inner">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-badge">
                  <span className="badge-dot"></span>
                  <span>Featured</span>
                </div>
              </div>
              <div className="feature-card-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Timeline */}
      <section className="story-section">
        <h2 className="section-title">Our Journey</h2>
        <div className="timeline-vertical">
          {[
            { year: "2023 Q4", event: "Concept Born", detail: "Idea sparked during a hackathon" },
            { year: "2024 Q1", event: "Alpha Launch", detail: "First 100 users onboarded" },
            { year: "2024 Q2", event: "Seed Funding", detail: "$2M raised from top investors" },
            { year: "2024 Q3", event: "Public Launch", detail: "Opened platform to everyone" },
            { year: "2024 Q4", event: "10K Users", detail: "Community milestone achieved" },
            { year: "2025 Q1", event: "AI Expansion", detail: "Launched advanced AI features" }
          ].map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className="marker-circle"></div>
                <div className="marker-line"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-event">{item.event}</h3>
                <p className="timeline-detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <h2 className="section-title">
              Numbers That <span className="highlight">Speak</span>
            </h2>
            <p className="stats-subtitle">Real impact, real results</p>
          </div>
          
          <div className="stats-grid-animated">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{animatedNumbers.seekers.toLocaleString()}+</div>
              <div className="stat-label">Talented Professionals</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🏢</div>
              <div className="stat-number">{animatedNumbers.companies.toLocaleString()}+</div>
              <div className="stat-label">Partner Companies</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-number">{animatedNumbers.jobs.toLocaleString()}+</div>
              <div className="stat-label">Quality Opportunities</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '98%' }}></div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">{animatedNumbers.satisfaction}%</div>
              <div className="stat-label">Satisfaction Rate</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">
            Meet The <span className="gradient-text">Visionaries</span>
          </h2>
          <p className="section-subtitle">The brilliant minds behind Skillora</p>
        </div>
        
        <div className="team-grid-hologram">
          {[
            { name: "Alex Chen", role: "CEO & Founder", emoji: "👨‍💼", fact: "Ex-Google AI Lead" },
            { name: "Maya Rodriguez", role: "CTO", emoji: "👩‍💻", fact: "Open Source Contributor" },
            { name: "James Wilson", role: "Head of AI", emoji: "🤖", fact: "PhD in ML" },
            { name: "Sarah Johnson", role: "Product Lead", emoji: "🎨", fact: "Design Award Winner" }
          ].map((member, index) => (
            <div key={index} className="team-member-holo">
              <div className="holo-avatar">
                <div className="avatar-emoji">{member.emoji}</div>
                <div className="holo-ring"></div>
                <div className="holo-ring ring-2"></div>
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-fact">{member.fact}</p>
              </div>
              <div className="member-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Vision */}
      <section className="vision-section">
        <div className="vision-card">
          <div className="vision-content">
            <h2 className="vision-title">The Future Is <span className="highlight">Bright</span></h2>
            <p className="vision-statement">
              We're building the world's most intelligent career platform, 
              powered by cutting-edge AI and driven by human potential.
            </p>
            <div className="vision-features">
              <div className="vision-feature">
                <span className="vision-icon">🌐</span>
                <span>Global Expansion 2025</span>
              </div>
              <div className="vision-feature">
                <span className="vision-icon">🤝</span>
                <span>Corporate Partnerships</span>
              </div>
              <div className="vision-feature">
                <span className="vision-icon">🎓</span>
                <span>University Programs</span>
              </div>
            </div>
          </div>
          <div className="vision-visual">
            <div className="pulsing-circle"></div>
            <div className="orbiting-element">🚀</div>
            <div className="orbiting-element element-2">🌍</div>
          </div>
        </div>
      </section>

      {/* CTA with Glow Effect */}
      <section className="cta-section-glow">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Career?</h2>
          <p className="cta-subtitle">
            Join thousands who've already found their dream opportunities
          </p>
          <div className="cta-buttons">
            <button className="cta-btn-primary">
              <span className="btn-text">Start Your Journey</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="cta-btn-secondary">
              <span className="btn-text">Schedule Demo</span>
              <span className="btn-icon">🎯</span>
            </button>
          </div>
          <div className="cta-stats">
            <div className="live-stat">
              <span className="live-dot"></span>
              <span>15 people joined today</span>
            </div>
          </div>
        </div>
        <div className="cta-glow-effect"></div>
      </section>
    </div>
  );
};

export default About;