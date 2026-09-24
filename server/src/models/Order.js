const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    orderNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM(
        "placed",
        "pending_confirmation",
        "confirmed",
        "processing",
        "fulfilled",
        "cancelled"
      ),
      allowNull: false,
      defaultValue: "pending_confirmation",
    },

    fulfillmentMethod: {
      type: DataTypes.ENUM("pickup", "courier"),
      allowNull: false,
    },

    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    fulfilledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;  