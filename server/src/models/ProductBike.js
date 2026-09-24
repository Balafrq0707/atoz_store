const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductBike = sequelize.define(
  "ProductBike",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    tableName: "product_bikes",
    timestamps: false,
  }
);

module.exports = ProductBike;