const express = require("express");
const router = express.Router();
const {
  getPopularVideos,
  searchVideos,
} = require("../controllers/youtube.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/popular", protect, getPopularVideos);

router.get("/search", searchVideos);

module.exports = router;
