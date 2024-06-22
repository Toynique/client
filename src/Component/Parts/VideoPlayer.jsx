

// VideoPlayer.js
import React, { useRef, useState } from 'react'; 

const VideoPlayer = (props) => {
  const {videoPath, posterPath} = props
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(true);

  const handleVideoClick = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play().then(() => setShowButton(false)).catch(() => setShowButton(true));
    } else {
      video.pause();
      setShowButton(true);
    }
  };

  return ( 
      <div className="video-container">
        <video
          ref={videoRef}
          className="rounded"
          controls
          // muted
          width="100%"
          height="100%"
          poster={posterPath}
          onPause={() => setShowButton(true)}
          onPlay={() => setShowButton(false)}
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {showButton && <button className="btn bgPrimary bgPrimaryHover center-button" onClick={handleVideoClick}>Play</button>}
      </div> 
  );
};

export default VideoPlayer;

