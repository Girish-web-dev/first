import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as api from '../api';
import VideoPlayer from '../components/VideoPlayer';
import Spinner from '../components/Common/Spinner';
import { AuthContext } from '../context/AuthContext';
import styles from './WatchPage.module.css';
import toast from 'react-hot-toast';

const WatchPage = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const isYouTubeVideo = location.pathname.startsWith('/watch/yt/');

  useEffect(() => {
    if (!isYouTubeVideo && user) {
      const fetchVideo = async () => {
        setLoading(true);
        try {
          const { data } = await api.getVideo(id);
          setVideo(data.data);
        } catch (error) {
          console.error("Failed to fetch video details:", error);
          toast.error("Could not load this video.");
        } finally {
          setLoading(false);
        }
      };
      fetchVideo();
    } else {
      setLoading(false); 
    }
  }, [id, isYouTubeVideo, user]);

  if (loading) return <Spinner />;
  if (isYouTubeVideo) {
    const youtubeVideoUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
    return (
      <div className={styles.pageContainer}>
        <div className={styles.playerWrapper}>
          <iframe
            src={youtubeVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          ></iframe>
        </div>
        {}
      </div>
    );
  }
  if (!video) {
      return (
          <div className={styles.pageContainer}>
              <h1 className={styles.errorMessage}>Video not found.</h1>
              <p className={styles.errorSubtext}>The video you are looking for may have been removed or is unavailable.</p>
          </div>
      );
  }
  
  const serverUrl = 'http://localhost:5001';
  const videoSrc = `${serverUrl}/${video.filePath}`;
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.playerWrapper}>
        <VideoPlayer src={videoSrc} />
      </div>
      <div className={styles.detailsWrapper}>
        <h1 className={styles.title}>{video.title}</h1>
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