const catchAsyn = require("../utils/catchAsync");
const OrderItems = require("../models/OrderItems");

exports.getAllOrderItemsByOrderId = catchAsyn(async (req, res, next) => {
  let allOrderItems = await OrderItems.findAndCountAll({
    where: { orderId: req.params.id },
  });
  res.json({
    status: "success",
    message: "",
    data: {
      allOrderItems,
    },
  });
});

exports.createOrderItems = catchAsyn(async (req, res) => {
  const OrderItems = await OrderItems.create(req.body);
  res.json({
    status: "success",
    message: "OrderItem yaratildi",
    data: {
      OrderItems,
    },
  });
});
