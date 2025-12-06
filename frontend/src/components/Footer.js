import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Simple Skillora Info */}
        <div className="footer-content">
          <div className="skillora-info">
            <h3 className="skillora-title">Skillora</h3>
            <p className="skillora-description">
              Your AI-powered platform for discovering career opportunities 
              and connecting with employers worldwide.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="contact-info">
            <p className="contact-item">📧 contact@skillora.com</p>
            <p className="contact-item">📍 San Francisco, CA</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} Skillora. Empowering careers through technology.
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#help">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;