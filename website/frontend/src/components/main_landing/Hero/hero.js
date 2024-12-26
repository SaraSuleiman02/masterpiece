import React from "react";
import './Hero.css'; // You can add custom styles for this component
import Video from '../../../assets/videos/weddingVed.mp4';

const Hero = () => {
  return (
    <section id="hero" className="hero-container">
      {/* Background video */}
      <div className="hero-video-container">
        <video autoPlay muted loop className="hero-video">
          <source src={Video} type="video/mp4" />
        </video>
      </div>

      {/* Overlay layer */}
      <div className="hero-overlay"></div>

      {/* Hero content */}
      <div className="hero-content">
        <h1>Lumora</h1>
        <p>Create & plan your perfect event with us</p>
        
        <button className="cta-button"><a href="/login" >Get Started</a></button>
      </div>
    </section>
  );
};

export default Hero;
