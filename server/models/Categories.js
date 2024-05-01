const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Products = require("./Products");

const Categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);
Categories.hasMany(Products);
Products.belongsTo(Categories);
module.exports = Categories;
