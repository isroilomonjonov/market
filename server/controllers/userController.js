const Users = require("../models/Users");
const catchAsyn = require("../utils/catchAsync");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const QueryBuilder = require("../utils/queryBuilder");
const { compare, hash } = require("bcrypt");
exports.getAllUser = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .limitFields()
    .search(["first_name", "last_name", "username"])
    .sort();
  let allUser = await Users.findAndCountAll({
    ...queryBuilder.queryOptions,
  });
  allUser = queryBuilder.createPage(allUser);
  res.json({
    status: "success",
    message: "",
    data: {
      allUser,
    },
  });
});

exports.updateUserStatus = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Users.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  const updatedStudent = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedStudent,
    },
  });
});
exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Users.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createUser = catchAsyn(async (req, res) => {
  const validationErrors = validationResult(req);
  const newPassword = await hash(req.body.password, 8);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const user = await Users.create({ ...req.body, password: newPassword });
  res.json({
    status: "success",
    message: "Foydalanuvchi yaratildi",
    data: {
      user,
    },
  });
});
exports.updateUser = catchAsyn(async (req, res, next) => {
  const validationErrors = validationResult(req);
  // const newPassword = await hash(req.body.password, 8);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params;

  const byId = await Users.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  const passwordIsMatch = await compare(req.body.password, byId.password);
  const pastPasswordIsMatch = req.body.password == byId.password;
  if (!passwordIsMatch && !pastPasswordIsMatch) {
    return next(new AppError("Parol hato!", 400));
  }
  const updatedUser = await byId.update({
    ...req.body,
    password: byId.password,
  });
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedUser,
    },
  });
});
exports.deleteUser = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Users.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "User o'chirildi",
    data: null,
  });
});
exports.getUser = catchAsyn(async (req, res, next) => {
  console.log(req.user);
  const byId = await Users.findByPk(req.user.id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  const user = {
    id: byId.id,
    firstName: byId.firstName,
    username: byId.username,
    lastName: byId.lastName,
    role: byId.role,
  };
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId: user,
    },
  });
});
