const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Users = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["SUPER_ADMIN", "ADMIN"]),
      defaultValue: "ADMIN",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
        },
      },
    },
  },
  {
    underscored: true,
  }
);
module.exports = Users;
