const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post("/", authMiddleware, productController.createProduct)
  .get("/:id", productController.getById)
  .get("/", productController.getAllProduct)
  .patch("/:id", authMiddleware, productController.updateProduct)
  .delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
