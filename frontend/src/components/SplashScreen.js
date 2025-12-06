import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import Logo from './logo 1.png';

function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="splash-container">
      <img 
        src={Logo} 
        alt="Skillora Logo" 
        className="splash-logo" 
      />
    </div>
  );
}

export default SplashScreen;