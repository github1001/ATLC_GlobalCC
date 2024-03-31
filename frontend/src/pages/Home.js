import PageContent from '../components/PageContent';
import React, { useState, useEffect } from 'react'
import videoSource from "../components/Myvideo/videoBg.mp4";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./home.css"
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';

function HomePage() {
  const [videoLoaded, setVideoLoaded] = useState(false);


  useEffect(() => {
    const video = document.createElement('video');

    video.addEventListener('loadeddata', () => {
      setVideoLoaded(true);
    });

    video.src = videoSource;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'fixed';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)'; // Center the video
    video.style.minWidth = '100%'; // Ensure the video covers the entire width
    video.style.minHeight = '100vh'; // Ensure the video covers the entire height
    video.style.zIndex = '-10';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    document.body.style.margin = '0';
    document.body.style.padding = '0';

    document.body.appendChild(video);

    return () => {
      document.body.removeChild(video);
    };
  }, []);
  return videoLoaded ? (
    <>
      <PageContent title="">
        <h2>
          "Welcome to great opportunities! <br /> <br /> Find your niche !"</h2>
      </PageContent>
      <div className="home-page-container">
        <div className="centered-content">
          <h1>Imports and Exports</h1>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div id="about-us" className='aboutusCard'><AboutUs /></div>
      <div id="contact-us" className='contactUsCard'><ContactUs /></div>
    </>
  ) : null;
}

export default HomePage;
