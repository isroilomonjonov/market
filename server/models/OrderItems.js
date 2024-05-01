const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Orders = require("./Orders");
const Products = require("./Products");

const OrderItems = sequelize.define(
  "orderItems",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { underscored: true }
);
Products.hasMany(OrderItems);
OrderItems.belongsTo(Products);

module.exports = OrderItems;
