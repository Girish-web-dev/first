import React from 'react';

const VideoPlayer = ({ src }) => {
  if (!src) return <div>Loading video...</div>;
  const serverUrl = 'http://localhost:5001';
  const videoUrl = `${serverUrl}/${src}`;

  return (
    <video controls autoPlay style={{ width: '100%', maxHeight: '70vh', backgroundColor: '#000' }}>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;