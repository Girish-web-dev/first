import React, { useState, useEffect, useContext } from "react";
import * as api from "../api";
import VideoCard from "../components/VideoCard";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Common/Spinner";
// We are no longer importing the PremiumBanner
import styles from "./HomePage.module.css";
import toast from "react-hot-toast";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState("For You");

  useEffect(() => {
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const fetchVideos = async () => {
      setLoading(true);
      try {
        let response;
        if (activeFilter === "For You") {
          response = await api.getYouTubeVideos();
        } else {
          response = await api.searchYouTubeVideos(activeFilter);
        }

        const videoItems =
          response.data?.data?.items || response.data?.data || [];
        if (Array.isArray(videoItems)) {
          const formattedVideos = videoItems.map((video) => ({
            ...video,
            id: typeof video.id === "object" ? video.id.videoId : video.id,
          }));
          setVideos(formattedVideos);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Could not load videos. API quota may be exceeded.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user, activeFilter]);

  if (!user) {
    return <Spinner />;
  }

  return (
    // The <PremiumBanner /> component has been removed from the top
    <>
      <div className={styles.filterTags}>
        <button
          className={`${styles.tag} ${
            activeFilter === "For You" ? styles.activeTag : ""
          }`}
          onClick={() => setActiveFilter("For You")}
        >
          {" "}
          For You{" "}
        </button>
        {user?.feedPreferences?.map((interest) => (
          <button
            key={interest}
            className={`${styles.tag} ${
              activeFilter === interest ? styles.activeTag : ""
            }`}
            onClick={() => setActiveFilter(interest)}
          >
            {" "}
            {interest}{" "}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.gridContainer}>
          {videos && videos.length > 0 ? (
            videos.map((video, index) => (
              <VideoCard
                key={video.id || index}
                video={video}
                index={index}
                isYouTubeVideo={true}
              />
            ))
          ) : (
            <p className={styles.emptyMessage}>
              No videos found for "{activeFilter}". Please check back later.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
