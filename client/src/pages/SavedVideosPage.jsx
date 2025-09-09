import React, { useState, useEffect } from "react";
import * as api from "../api";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Common/Spinner";
import styles from "./SearchResultsPage.module.css"; 

const SavedVideosPage = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedVideos = async () => {
    setLoading(true);
    try {
      const { data } = await api.getSavedVideos();
      setSavedVideos(data.data);
    } catch (error) {
      console.error("Failed to fetch saved videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedVideos();
  }, []);

  const handleVideoUnsaved = (unsavedVideoId) => {
    setSavedVideos((currentVideos) =>
      currentVideos.filter((videoItem) => videoItem.videoId !== unsavedVideoId)
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.pageContainer}>
      <h1 className={`${styles.pageTitle}`}>Saved Videos</h1>
      <div className={styles.gridContainer}>
        {savedVideos.length > 0 ? (
          savedVideos.map((savedItem, index) => (
            <VideoCard
              key={savedItem.videoId || index}
              video={savedItem.videoData} 
              isYouTubeVideo={true}
              isSavedPage={true}
              onUnsave={() => handleVideoUnsaved(savedItem.videoId)}
              index={index}
            />
          ))
        ) : (
          <p>You haven't saved any videos yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedVideosPage;
