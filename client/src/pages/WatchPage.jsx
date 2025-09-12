import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as api from '../api';
import VideoPlayer from '../components/VideoPlayer';
import Spinner from '../components/Common/Spinner';
import styles from './WatchPage.module.css';
import toast from 'react-hot-toast';

const WatchPage = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const isYouTubeVideo = location.pathname.startsWith('/watch/yt/');

  useEffect(() => {
    if (!isYouTubeVideo) {
    } else {
      setLoading(false);
    }
  }, [id, isYouTubeVideo]);

  if (loading) return <Spinner />;
  if (isYouTubeVideo) {  }
  if (!video) return <div className={styles.pageContainer}><h1>Video not found.</h1></div>;

  const videoSrc = `/${video.filePath}`;  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.playerWrapper}>
        <VideoPlayer src={videoSrc} />
      </div>
      <div className={styles.detailsWrapper}>
        <h1 className={`${styles.title}`}>{video.title}</h1>
        <div className={styles.metadata}>
            <span>By {video.uploader.username}</span>
            <span>•</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{video.views} views</span>
        </div>
        <p className={styles.description}>{video.description}</p>
      </div>
    </div>
  );
};

export default WatchPage;