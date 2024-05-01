const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const attachmentController = require("../controllers/attachmentController");

const router = express.Router();

router
  .post("/", upload.single("img"), attachmentController.createFoodImg)
  .get("/", attachmentController.getAllAttachments)
  .get("/:id", attachmentController.getAttachmentById)
  .put("/:id", attachmentController.activateImage);

module.exports = router;
