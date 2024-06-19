const catchAsyn = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Categories = require("../models/Categories");

exports.getAllCategory = catchAsyn(async (req, res, next) => {
  let allCategory = await Categories.findAndCountAll();
  res.json({
    status: "success",
    message: "",
    data: {
      allCategory,
    },
  });
});

exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Categories.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Kategoriya topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createCategory = catchAsyn(async (req, res) => {
  const Category = await Categories.create(req.body);
  res.json({
    status: "success",
    message: "Kategoriya yaratildi",
    data: {
      Category,
    },
  });
});
exports.updateCategory = catchAsyn(async (req, res) => {
  const { id } = req.params;

  const byId = await Categories.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Kategoriya topilmadi"));
  }
  const updatedCategory = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Kategoriya ma'lumotlari tahrirlandi",
    data: {
      updatedCategory,
    },
  });
});
exports.deleteCategory = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Categories.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Kategoriya topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "Kategoriya o'chirildi",
    data: null,
  });
});
