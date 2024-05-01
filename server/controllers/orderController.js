const Orders = require("../models/Orders");
const catchAsyn = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const QueryBuilder = require("../utils/queryBuilder");

exports.getAllOrder = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder.filter().paginate().limitFields().search().sort();
  let allOrders = await Orders.findAndCountAll({
    ...queryBuilder.queryOptions,
  });
  allOrders = queryBuilder.createPage(allOrders);
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
  const Order = await Orders.create(req.body);
  res.json({
    status: "success",
    message: "Order yaratildi",
    data: {
      Order,
    },
  });
});
exports.updateOrder = catchAsyn(async (req, res) => {
  const { id } = req.params;

  const byId = await Orders.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Order topilmadi"));
  }
  const updatedOrder = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Order ma'lumotlari tahrirlandi",
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
