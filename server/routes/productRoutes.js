const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController");

const router = express.Router();

router
  .post("/", productController.createProduct)
  .get("/:id", productController.getById)
  .get("/", productController.getAllProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = router;
