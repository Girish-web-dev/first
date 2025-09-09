const mongoose = require("mongoose");

const SavedVideoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  videoData: {
    type: Object,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

SavedVideoSchema.index({ user: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model("SavedVideo", SavedVideoSchema);
