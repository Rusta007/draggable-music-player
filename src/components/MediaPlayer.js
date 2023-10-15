import React, { useState, useRef } from 'react';

const MediaPlayer = ({ source }) => {
  const mediaRef = useRef();
  const [isVideo, setIsVideo] = useState(source.endsWith('.mp4'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggleMedia = () => {
    setIsVideo(!isVideo);
    setIsPlaying(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - dragStart.x;
      const y = e.clientY - dragStart.y;
      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const mediaBarStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
    position: 'relative',
    top: position.y,
    left: position.x,
    display: 'inline-block'
  };

  return (
        <div
        style={mediaBarStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className='videoDivBar'>
          {isVideo ? (
            <video ref={mediaRef} width="100%" height="100%" controls src={source}></video>
          ) : (
            <audio ref={mediaRef} controls src={source}></audio>
          )}
        </div>
      <button className='toggleButton' onClick={toggleMedia}>Toggle {isVideo ? 'Audio' : 'Video'}</button>
      </div>
   
  );
};

export default MediaPlayer;
