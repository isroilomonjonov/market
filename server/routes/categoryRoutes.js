const express = require("express");
const { body } = require("express-validator");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post("/", authMiddleware, categoryController.createCategory)
  .get("/:id", categoryController.getById)
  .get("/", categoryController.getAllCategory)
  .patch("/:id", authMiddleware, categoryController.updateCategory)
  .delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;
