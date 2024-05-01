const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Albums = sequelize.define(
  "album",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { underscored: true }
);

module.exports = Albums;
