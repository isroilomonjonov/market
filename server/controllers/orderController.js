const Orders = require("../models/Orders");
const catchAsyn = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const QueryBuilder = require("../utils/queryBuilder");
const OrderItems = require("../models/OrderItems");
const { Op } = require("sequelize");
const timeObject = require("../utils/timeObject");
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
exports.getStatistics = catchAsyn(async (req, res) => {
  const queryData = req.query;
  const query = Object.keys(req.query).find(
    (e) =>
      e === "yesterday" ||
      "today" ||
      "week" ||
      "month" ||
      "year" ||
      ("start" && "end")
  );
  const getTime = new timeObject(query, queryData).getTimes();

  const allOrders = await Orders.findAndCountAll({
    where: {
      createdAt: {
        [Op.gt]: getTime.start,
        [Op.lt]: getTime.end,
      },
    },
  });
  const allOrdersStatusCompleted = await Orders.findAndCountAll({
    where: {
      status: "completed",
      createdAt: {
        [Op.gt]: getTime.start,
        [Op.lt]: getTime.end,
      },
    },
  });
  const totalPrice = await Orders.sum("totalPrice", {
    where: {
      status: "completed",
      createdAt: {
        [Op.gt]: getTime.start,
        [Op.lt]: getTime.end,
      },
    },
  });
  const allOrdersStatusCanceled = await Orders.findAndCountAll({
    where: {
      status: "canceled",
      createdAt: {
        [Op.gt]: getTime.start,
        [Op.lt]: getTime.end,
      },
    },
  });
  const queryBuilder = new QueryBuilder(req.query);
  res.status(201).json({
    status: "success",
    message: "Barcha orderlar",
    data: {
      allOrders: allOrders.count,
      allOrdersStatusCompleted: allOrdersStatusCompleted.count,
      allOrdersStatusCanceled: allOrdersStatusCanceled.count,
      totalPrice,
      getTime,
    },
  });
});
