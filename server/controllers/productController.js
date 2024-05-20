const Products = require("../models/Products");
const catchAsyn = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const QueryBuilder = require("../utils/queryBuilder");
const Categories = require("../models/Categories");
const Attachments = require("../models/Attachments");

exports.getAllProduct = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder.filter().paginate().limitFields().search(["title"]).sort();
  let allProduct = await Products.findAndCountAll({
    ...queryBuilder.queryOptions,
    include: [{ model: Categories }, { model: Attachments }],
  });
  allProduct = queryBuilder.createPage(allProduct);
  res.json({
    status: "success",
    message: "",
    data: {
      allProduct,
    },
  });
});

exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Products.findOne({
    where: {
      id: id,
    },
    include: [{ model: Categories }, { model: Attachments }],
  });
  if (!byId) {
    return next(new AppError("Bunday ID li Product topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createProduct = catchAsyn(async (req, res) => {
  const Product = await Products.create(req.body);
  res.json({
    status: "success",
    message: "Produkt yaratildi",
    data: {
      Product,
    },
  });
});
exports.updateProduct = catchAsyn(async (req, res) => {
  const { id } = req.params;

  const byId = await Products.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Produkt topilmadi"));
  }
  const updatedProduct = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Produkt ma'lumotlari tahrirlandi",
    data: {
      updatedProduct,
    },
  });
});
exports.deleteProduct = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Products.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Produkt topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "Produkt o'chirildi",
    data: null,
  });
});
