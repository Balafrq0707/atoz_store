  const sequelize = require("../config/database");

  const User = require("./User");
  const Bike = require("./Bike");
  const Category = require("./Category");
  const Product = require("./Product");
  const ProductVariant = require("./ProductVariant");
  const ProductBike = require("./ProductBike");
  const Address = require("./Address");
  const Order = require("./Order");
  const OrderItem = require("./OrderItem");
  const PartRequest = require("./PartRequest");

  // Category → Products
  Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
  });

  Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
  });

  // Product → Variants
  Product.hasMany(ProductVariant, {
    foreignKey: "productId",
    as: "variants",
  });

  ProductVariant.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
  });

  // Product ↔ Bike
  Product.belongsToMany(Bike, {
    through: ProductBike,
    foreignKey: "productId",
    otherKey: "bikeId",
    as: "compatibleBikes",
  });

  Bike.belongsToMany(Product, {
    through: ProductBike,
    foreignKey: "bikeId",
    otherKey: "productId",
    as: "compatibleProducts",
  });

  // User → Addresses
  User.hasMany(Address, {
    foreignKey: "userId",
    as: "addresses",
  });

  Address.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // User → Orders
  User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
  });

  Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // Order → OrderItems
  Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
  });

  OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
  });

  // ProductVariant → OrderItems
  ProductVariant.hasMany(OrderItem, {
    foreignKey: "productVariantId",
    as: "orderItems",
  });

  OrderItem.belongsTo(ProductVariant, {
    foreignKey: "productVariantId",
    as: "productVariant",
  });

  // User → Part Requests
  User.hasMany(PartRequest, {
    foreignKey: "userId",
    as: "partRequests",
  });

  PartRequest.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  const syncDatabase = async () => {
    await sequelize.sync();

    console.log("Database tables synchronized");
  };

  module.exports = {
    sequelize,
    User,
    Bike,
    Category,
    Product,
    ProductVariant,
    ProductBike,
    Address,
    Order,
    OrderItem,
    PartRequest,
    syncDatabase,
  };