const { Op } = require("sequelize");
const Users = require("../models/Users");
const catchAsync = require("./catchAsync");
const uuid = require("uuid");
const { compare, hash } = require("bcrypt");
module.exports = catchAsync(async () => {
  const superAdminCount = await Users.count();
  const newPassword = await hash("isroilomon9999", 8);
  if (superAdminCount === 0) {
    const superAdminInfo = {
      firstName: "Isroiljon",
      lastName: "Omonjonov",
      username: "isroil",
      password: newPassword,
      role: "SUPER_ADMIN",
    };
    const createdUser = await Users.create(superAdminInfo);
  }
});
