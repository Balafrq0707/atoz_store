const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bike = sequelize.define(
  "Bike",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    brand: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    variant: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "bikes",
    timestamps: true,
  }
);

module.exports = Bike;