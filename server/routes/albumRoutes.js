const express = require("express");
const { body } = require("express-validator");
const albumController = require("../controllers/albumController");

const router = express.Router();

router
  .post("/", albumController.createAlbums)
  .get("/:id", albumController.getAllAlbumsByOrderId);

module.exports = router;
