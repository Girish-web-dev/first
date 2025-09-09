
const WatchPage = () => {

  if (!video)
    return (
      <div className={styles.pageContainer}>
        <h1 className="metallic-text">Video not found.</h1>
      </div>
    );

  const serverUrl = "http://localhost:5001";
  const videoSrc = `${serverUrl}/${video.filePath}`;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.playerWrapper}>
        <VideoPlayer src={videoSrc} />
      </div>
      <div className={styles.detailsWrapper}>
        <h1 className={`${styles.title} metallic-text`}>{video.title}</h1>
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
