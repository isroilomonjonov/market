const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const User = require("../models/Users");
const AppError = require("../utils/AppError");
const catchAsyn = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const Users = require("../models/Users");
const generateToken = (payload, jwtSecret, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
const findByUsername = async (username) => {
  const user = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });
  if (user) {
    return user;
  }
  return null;
};
exports.register = catchAsyn(async (req, res, next) => {
  const validationErrorrs = validationResult(req);
  if (!validationErrorrs.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.isOperational = false;
    err.errors = validationErrorrs.errors;
    return next(err);
  }
  const existedUser = await findByUsername(req.body.username);
  req.body.username.toLowerCase();
  if (existedUser) {
    return next(new AppError("Bunday Usernameli foydalanuvchi mavjud ", 409));
  }
  const newPassword = await hash(req.body.password, 8);
  const newUser = await User.create({ ...req.body, password: newPassword });
  const payload = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    username: newUser.username,
    email: newUser.email,
    isVerified: newUser.isVerified,
    role: newUser.role,
  };
  const token = await generateToken(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "24h",
  });
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      user: {
        ...payload,
        token: token,
      },
    },
  });
});
exports.login = catchAsyn(async (req, res, next) => {
  const validationErrorrs = validationResult(req);
  if (!validationErrorrs.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.isOperational = false;
    err.errors = validationErrorrs.errors;
    return next(err);
  }
  const { username, password } = req.body;
  console.log(username, password);
  const candidate = await findByUsername(username);
  console.log(candidate);
  if (!candidate) {
    return next(new AppError("Login yoki parol xato!", 400));
  }
  const passwordIsMatch = await compare(password, candidate.password);
  const pastPasswordIsMatch = password == candidate.password;
  if (!passwordIsMatch && !pastPasswordIsMatch) {
    return next(new AppError("Login yoki parol xato!", 400));
  }

  const payload = {
    id: candidate.id,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    username: candidate.username,
    email: candidate.email,
    isVerified: candidate.isVerified,
    role: candidate.role,
  };
  const token = await generateToken(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "24h",
  });
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      user: {
        ...payload,
        token: token,
      },
    },
  });
});
exports.repassword = catchAsyn(async (req, res, next) => {
  const { password, newPassword, id } = req.body;
  const byId = await Users.findByPk(id);

  if (!byId) {
    return next(new AppError("Bu user topilmadi!", 400));
  }
  const passwordIsMatch = await compare(password, byId.password);
  const pastPasswordIsMatch = password == byId.password;
  if (!passwordIsMatch && !pastPasswordIsMatch) {
    return next(new AppError("Parol xato!", 400));
  }
  const updatedPassword = await hash(newPassword, 8);
  await byId.update({
    password: updatedPassword,
  });

  res.json({
    status: "success",
    message: "Parolingiz muvaffaqiyatli o'zgartirildi!",
    error: null,
  });
});
