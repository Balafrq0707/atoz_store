require("dotenv").config();

const {
  sequelize,
  Bike,
  Category,
  Product,
  ProductVariant,
  ProductBike,
} = require("../models");

const seedDatabase = async () => {
  try {
    console.log("Connecting to PostgreSQL...");

    await sequelize.authenticate();

    console.log("Connected.");

    // Clear existing demo data
    await ProductBike.destroy({ where: {} });
    await ProductVariant.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
    await Bike.destroy({ where: {} });

    console.log("Old seed data cleared.");

    // -------------------------
    // BIKES
    // -------------------------

    const bikes = await Bike.bulkCreate([
      { brand: "Bajaj", model: "CT 100", year: 2020, variant: "Standard" },
      { brand: "Bajaj", model: "Platina 100", year: 2021, variant: "Standard" },

      { brand: "Honda", model: "CD 100", year: 2019, variant: "Standard" },
      { brand: "Honda", model: "Shine 100", year: 2023, variant: "Standard" },
      { brand: "Honda", model: "Dream 100", year: 2020, variant: "Standard" },

      { brand: "Hero", model: "HF 100", year: 2022, variant: "Standard" },
      { brand: "Hero", model: "Splendor", year: 2020, variant: "Standard" },
      { brand: "Hero", model: "Splendor Plus", year: 2022, variant: "Standard" },

      { brand: "TVS", model: "Sport", year: 2020, variant: "Standard" },
      { brand: "TVS", model: "Sport", year: 2022, variant: "Standard" },
      { brand: "TVS", model: "Radeon", year: 2021, variant: "Standard" },
    ]);

    // -------------------------
    // CATEGORIES
    // -------------------------

    const categories = await Category.bulkCreate([
      {
        name: "Fiber / Body Parts",
        slug: "fiber-body-parts",
        description: "Motorcycle fiber and body replacement parts",
      },
      {
        name: "Chains",
        slug: "chains",
        description: "Motorcycle chains and chain kits",
      },
      {
        name: "Sprockets",
        slug: "sprockets",
        description: "Front and rear motorcycle sprockets",
      },
      {
        name: "Gears",
        slug: "gears",
        description: "Motorcycle transmission and gear components",
      },
    ]);

    const categoryMap = Object.fromEntries(
      categories.map((category) => [category.slug, category.id])
    );

    // -------------------------
    // PRODUCTS
    // -------------------------

    const products = await Product.bulkCreate([
      {
        name: "Front Mudguard - Demo",
        slug: "front-mudguard-demo",
        description: "Demo motorcycle front mudguard.",
        classification: "aftermarket",
        categoryId: categoryMap["fiber-body-parts"],
      },
      {
        name: "Side Panel - Demo",
        slug: "side-panel-demo",
        description: "Demo motorcycle side panel.",
        classification: "aftermarket",
        categoryId: categoryMap["fiber-body-parts"],
      },
      {
        name: "Headlight Cover - Demo",
        slug: "headlight-cover-demo",
        description: "Demo motorcycle headlight cover.",
        classification: "original",
        categoryId: categoryMap["fiber-body-parts"],
      },
      {
        name: "Chain Cover - Demo",
        slug: "chain-cover-demo",
        description: "Demo motorcycle chain cover.",
        classification: "aftermarket",
        categoryId: categoryMap["fiber-body-parts"],
      },
      {
        name: "Standard Chain Kit - Demo",
        slug: "standard-chain-kit-demo",
        description: "Demo motorcycle chain kit.",
        classification: "aftermarket",
        categoryId: categoryMap["chains"],
      },
      {
        name: "Heavy Duty Chain - Demo",
        slug: "heavy-duty-chain-demo",
        description: "Demo heavy-duty motorcycle chain.",
        classification: "original",
        categoryId: categoryMap["chains"],
      },
      {
        name: "Drive Chain - Demo",
        slug: "drive-chain-demo",
        description: "Demo motorcycle drive chain.",
        classification: "aftermarket",
        categoryId: categoryMap["chains"],
      },
      {
        name: "Premium Chain Kit - Demo",
        slug: "premium-chain-kit-demo",
        description: "Demo premium chain kit.",
        classification: "aftermarket",
        categoryId: categoryMap["chains"],
      },
      {
        name: "Front Sprocket - Demo",
        slug: "front-sprocket-demo",
        description: "Demo motorcycle front sprocket.",
        classification: "original",
        categoryId: categoryMap["sprockets"],
      },
      {
        name: "Rear Sprocket - Demo",
        slug: "rear-sprocket-demo",
        description: "Demo motorcycle rear sprocket.",
        classification: "aftermarket",
        categoryId: categoryMap["sprockets"],
      },
      {
        name: "Sprocket Set - Demo",
        slug: "sprocket-set-demo",
        description: "Demo motorcycle sprocket set.",
        classification: "aftermarket",
        categoryId: categoryMap["sprockets"],
      },
      {
        name: "Primary Gear - Demo",
        slug: "primary-gear-demo",
        description: "Demo motorcycle primary gear.",
        classification: "original",
        categoryId: categoryMap["gears"],
      },
      {
        name: "Transmission Gear - Demo",
        slug: "transmission-gear-demo",
        description: "Demo motorcycle transmission gear.",
        classification: "aftermarket",
        categoryId: categoryMap["gears"],
      },
      {
        name: "Gear Set - Demo",
        slug: "gear-set-demo",
        description: "Demo motorcycle gear set.",
        classification: "aftermarket",
        categoryId: categoryMap["gears"],
      },
    ]);

    // -------------------------
    // VARIANTS
    // -------------------------

    const variantData = [
      ["front-mudguard-demo", "Standard", "FMG-DEMO-001", 650, 10],
      ["side-panel-demo", "Standard", "SP-DEMO-001", 850, 8],
      ["headlight-cover-demo", "Standard", "HLC-DEMO-001", 550, 5],
      ["chain-cover-demo", "Standard", "CC-DEMO-001", 450, 5],

      ["standard-chain-kit-demo", "Standard", "CHK-DEMO-001", 950, 10],
      ["heavy-duty-chain-demo", "Standard", "HDC-DEMO-001", 1400, 5],
      ["drive-chain-demo", "Standard", "DC-DEMO-001", 750, 8],
      ["premium-chain-kit-demo", "Standard", "PCK-DEMO-001", 1650, 5],

      ["front-sprocket-demo", "Standard", "FS-DEMO-001", 350, 10],
      ["rear-sprocket-demo", "Standard", "RS-DEMO-001", 650, 10],
      ["sprocket-set-demo", "Standard", "SS-DEMO-001", 900, 8],

      ["primary-gear-demo", "Standard", "PG-DEMO-001", 1200, 5],
      ["transmission-gear-demo", "Standard", "TG-DEMO-001", 950, 5],
      ["gear-set-demo", "Standard", "GS-DEMO-001", 2200, 4],
    ];

    const productMap = Object.fromEntries(
      products.map((product) => [product.slug, product.id])
    );

    const variants = await ProductVariant.bulkCreate(
      variantData.map(([slug, variantName, sku, price, stock]) => ({
        productId: productMap[slug],
        variantName,
        sku,
        price,
        stockQuantity: stock,
        lowStockThreshold: 3,
      }))
    );

    // -------------------------
    // PRODUCT ↔ BIKE COMPATIBILITY
    // -------------------------

    const bikeMap = Object.fromEntries(
      bikes.map((bike) => [
        `${bike.brand}-${bike.model}-${bike.year}`,
        bike.id,
      ])
    );

    const compatibility = [
      ["front-mudguard-demo", [
        "Honda-CD 100-2019",
        "Hero-HF 100-2022",
        "TVS-Sport-2020",
      ]],

      ["side-panel-demo", [
        "Hero-Splendor-2020",
        "Hero-Splendor Plus-2022",
        "Bajaj-CT 100-2020",
      ]],

      ["headlight-cover-demo", [
        "Honda-Shine 100-2023",
        "Honda-Dream 100-2020",
      ]],

      ["chain-cover-demo", [
        "Bajaj-CT 100-2020",
        "Bajaj-Platina 100-2021",
        "TVS-Radeon-2021",
      ]],

      ["standard-chain-kit-demo", [
        "Bajaj-CT 100-2020",
        "Honda-CD 100-2019",
        "Hero-HF 100-2022",
        "TVS-Sport-2020",
      ]],

      ["heavy-duty-chain-demo", [
        "Hero-Splendor-2020",
        "Hero-Splendor Plus-2022",
        "TVS-Sport-2022",
      ]],

      ["drive-chain-demo", [
        "Honda-Shine 100-2023",
        "Honda-Dream 100-2020",
        "TVS-Radeon-2021",
      ]],

      ["premium-chain-kit-demo", [
        "Bajaj-Platina 100-2021",
        "Hero-Splendor Plus-2022",
        "TVS-Sport-2022",
      ]],

      ["front-sprocket-demo", [
        "Bajaj-CT 100-2020",
        "Honda-CD 100-2019",
        "Hero-HF 100-2022",
      ]],

      ["rear-sprocket-demo", [
        "Honda-Shine 100-2023",
        "Hero-Splendor-2020",
        "TVS-Sport-2020",
      ]],

      ["sprocket-set-demo", [
        "Bajaj-Platina 100-2021",
        "Hero-Splendor Plus-2022",
        "TVS-Radeon-2021",
      ]],

      ["primary-gear-demo", [
        "Honda-Dream 100-2020",
        "Hero-HF 100-2022",
      ]],

      ["transmission-gear-demo", [
        "Bajaj-CT 100-2020",
        "TVS-Sport-2022",
      ]],

      ["gear-set-demo", [
        "Hero-Splendor-2020",
        "Hero-Splendor Plus-2022",
        "Bajaj-Platina 100-2021",
      ]],
    ];

    const productBikeRows = [];

    for (const [productSlug, bikeKeys] of compatibility) {
      for (const bikeKey of bikeKeys) {
        productBikeRows.push({
          productId: productMap[productSlug],
          bikeId: bikeMap[bikeKey],
        });
      }
    }

    await ProductBike.bulkCreate(productBikeRows);

    console.log("Seed completed successfully.");
    console.log(`Bikes: ${bikes.length}`);
    console.log(`Categories: ${categories.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Variants: ${variants.length}`);
    console.log(`Compatibility records: ${productBikeRows.length}`);

  } catch (error) {
    console.error("Seed failed:");
    console.error(error);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();