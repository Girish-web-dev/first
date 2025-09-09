const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
  uploadVideo,
  getVideos,
  getVideoById,
  getMyVideos,
} = require("../controllers/video.controller");

router.route("/").get(getVideos).post(protect, uploadVideo);

router.get("/my-videos", protect, getMyVideos);

router.route("/:id").get(getVideoById);

module.exports = router;
