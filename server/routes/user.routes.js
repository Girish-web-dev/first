const express = require("express");
const router = express.Router();

const {
  getFeedPreferences,
  updateFeedPreferences,
  getSavedVideos,
  addSavedVideo,
  removeSavedVideo,
  changePassword, 
} = require("../controllers/user.controller");

const { protect } = require("../middleware/auth.middleware");

router
  .route("/preferences")
  .get(protect, getFeedPreferences)
  .put(protect, updateFeedPreferences);

router
  .route("/saved-videos")
  .get(protect, getSavedVideos)
  .post(protect, addSavedVideo);
router.delete("/saved-videos/:videoId", protect, removeSavedVideo);

router.put("/change-password", protect, changePassword);

module.exports = router;
