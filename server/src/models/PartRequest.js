const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PartRequest = sequelize.define(
  "PartRequest",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    requestType: {
      type: DataTypes.ENUM(
        "part_request",
        "original_request"
      ),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "submitted",
        "reviewing",
        "sourcing",
        "available",
        "customer_contacted",
        "completed",
        "unable_to_source"
      ),
      allowNull: false,
      defaultValue: "submitted",
    },

    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    customerNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "part_requests",
    timestamps: true,
  }
);

module.exports = PartRequest;