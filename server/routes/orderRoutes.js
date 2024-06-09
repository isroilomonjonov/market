const express = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/orderController");

const router = express.Router();

router
  .post("/", orderController.createOrder)
  .get("/:id", orderController.getById)
  .get("/", orderController.getAllOrder)
  .patch("/:id", orderController.updateOrderStatus)
  .delete("/:id", orderController.deleteOrder);

module.exports = router;
