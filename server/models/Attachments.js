const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Products = require("./Products");
const Albums = require("./Albums");

const Attachments = sequelize.define(
  "attachments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    originalName: DataTypes.STRING,
    size: DataTypes.BIGINT,
    type: DataTypes.STRING,
    isConnect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { underscored: true }
);
Attachments.hasMany(Albums);
Albums.belongsTo(Attachments);
Products.hasMany(Albums);
Albums.belongsTo(Products);
module.exports = Attachments;
