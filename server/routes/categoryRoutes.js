const express = require("express");
const { body } = require("express-validator");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .post("/", categoryController.createCategory)
  .get("/:id", categoryController.getById)
  .get("/", categoryController.getAllCategory)
  .patch("/:id", categoryController.updateCategory)
  .delete("/:id", categoryController.deleteCategory);

module.exports = router;
