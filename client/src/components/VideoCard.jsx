import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';
import { FiBookmark, FiTrash2 } from 'react-icons/fi';
import * as api from '../api';
import toast from 'react-hot-toast';

const VideoCard = ({ video, isYouTubeVideo = false, index, isSavedPage = false, onUnsave }) => {
    let videoData = {};

    if (isYouTubeVideo) {
        videoData = {
            url: `/watch/yt/${video.id}`,
            thumbnailUrl: video.snippet?.thumbnails?.high?.url || '',
            title: video.snippet?.title || 'Untitled Video',
            channel: video.snippet?.channelTitle || 'Unknown Channel',
            views: formatViews(video.statistics?.viewCount)
        };
    } else {
        videoData = {
            url: `/watch/${video._id}`,
            thumbnailUrl: `/${video.thumbnailPath}`, // Use a relative path
            title: video.title,
            channel: video.uploader?.username || 'Unknown Uploader',
            views: formatViews(video.views)
        };
    }
};

export default VideoCard;