const Orders = require("../models/Orders");
const catchAsyn = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const QueryBuilder = require("../utils/queryBuilder");
const OrderItems = require("../models/OrderItems");
const { Op } = require("sequelize");

exports.getAllOrder = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder.filter().paginate().sort();
  let allOrders = await Orders.findAndCountAll({
    ...queryBuilder.queryOptions,
  });
  allOrders = queryBuilder.createPagination(allOrders);
  res.json({
    status: "success",
    message: "",
    data: {
      allOrders,
    },
  });
});

exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Orders.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Order topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createOrder = catchAsyn(async (req, res) => {
  const { items, name, phoneNumber } = req.body;
  let newOrder;
  newOrder = await Orders.create({
    name,
    phoneNumber,
  });
  const itemArr = [];

  items?.forEach((item) => {
    return itemArr.push({
      subtotal: item.discount
        ? item.discount * item.quantity
        : item.price * item.quantity,
      quantity: item.quantity,
      productId: item.id,
      orderId: newOrder.id,
    });
  });
  await OrderItems.bulkCreate(itemArr);
  const totalMoney = await OrderItems.sum("subtotal", {
    where: { orderId: { [Op.eq]: newOrder.id } },
  });
  await newOrder.update({ totalPrice: totalMoney });

  res.json({
    status: "success",
    message: "Order yaratildi",
    data: {
      newOrder,
    },
  });
});
exports.updateOrderStatus = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Orders.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Order topilmadi"));
  }
  const updatedOrder = await byId.update({ status: req.body.status });
  res.json({
    status: "success",
    message: "Buyurtma statusi o'zgartirildi",
    data: {
      updatedOrder,
    },
  });
});
exports.deleteOrder = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Orders.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Order topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "Order o'chirildi",
    data: null,
  });
});
