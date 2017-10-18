import React from 'react';

const Home = () => {
  return (
    <div id="home-container">
      <div id="video-overlay" />
      <video loop muted autoPlay src="/landing-video.mp4" />
    </div>
  )
}

export default Home;
