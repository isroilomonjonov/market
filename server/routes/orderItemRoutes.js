const express = require("express");
const { body } = require("express-validator");
const orderItemController = require("../controllers/orderItemController");

const router = express.Router();

router
  .post("/", orderItemController.createOrderItems)
  .get("/:id", orderItemController.getAllOrderItemsByOrderId);

module.exports = router;
