const Video = require("../models/Video.model");
const multer = require("multer");
const path = require("path");
const logger = require("../utils/logger");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "videoFile" },
  { name: "thumbnailFile" },
]);

exports.uploadVideo = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error(`Local Upload Error: ${err.message}`);
      return res
        .status(400)
        .json({ success: false, message: `File Upload Error: ${err.message}` });
    }

    if (!req.files.videoFile || !req.files.thumbnailFile) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please upload both a video and a thumbnail file.",
        });
    }

    const { title, description, tags } = req.body;

    const videoPath = path
      .join("uploads", req.files.videoFile[0].filename)
      .replace(/\\/g, "/");
    const thumbnailPath = path
      .join("uploads", req.files.thumbnailFile[0].filename)
      .replace(/\\/g, "/");

    const video = new Video({
      title,
      description,
      filePath: videoPath, 
      thumbnailPath: thumbnailPath, 
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      uploader: req.user.id,
    });

    try {
      await video.save();
      logger.info(
        `Video saved locally by ${req.user.username}: ${video.title}`
      );
      res.status(201).json({ success: true, data: video });
    } catch (error) {
      logger.error(`DB save error after local upload: ${error.message}`);
      res
        .status(500)
        .json({
          success: false,
          message: "Server error while saving video data.",
        });
    }
  });
};

exports.getVideos = async (req, res) => {
};
exports.getVideoById = async (req, res) => {
};
exports.getMyVideos = async (req, res) => {
};
