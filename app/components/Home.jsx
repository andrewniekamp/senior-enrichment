import React from 'react';

const Home = () => {
  return (
    <div id="home-container">
      <h1 id="welcome-message">Welcome</h1>
      <div id="video-overlay" />
      <video loop muted autoPlay src="/landing-video.mp4" />
    </div>
  )
}

export default Home;
