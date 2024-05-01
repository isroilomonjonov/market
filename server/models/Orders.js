const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Users = require("./Users");
const OrderItems = require("./OrderItems");

const Orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    totalProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "completed", "canceled"],
      defaultValue: "pending",
    },
  },
  { underscored: true }
);
Users.hasMany(Orders);
Orders.belongsTo(Users);
Orders.hasMany(OrderItems);
OrderItems.belongsTo(Orders);
module.exports = Orders;
