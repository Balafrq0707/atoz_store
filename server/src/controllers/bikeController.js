const { Bike } = require("../models");

const getBikes = async (req, res) => {
  const { brand, model, year, variant } = req.query;

  try {
    const where = {};

    if (brand && brand.trim()) {
      where.brand = brand.trim();
    }

    if (model && model.trim()) {
      where.model = model.trim();
    }

    if (year) {
      where.year = Number(year);
    }

    if (variant && variant.trim()) {
      where.variant = variant.trim();
    }

    const bikes = await Bike.findAll({
      attributes: [
        "id",
        "brand",
        "model",
        "year",
        "variant",
      ],
      where,
      order: [
        ["brand", "ASC"],
        ["model", "ASC"],
        ["year", "ASC"],
      ],
    });

    return res.status(200).json({
      success: true,
      data: bikes,
    });
  } catch (error) {
    console.error("Error fetching bikes:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bikes",
    });
  }
};


const getBikeById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Bike ID is required",
    });
  }

  try {
    const bike = await Bike.findByPk(id, {
      attributes: [
        "id",
        "brand",
        "model",
        "year",
        "variant",
      ],
    });

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: bike,
    });
  } catch (error) {
    console.error("Error fetching bike:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bike",
    });
  }
};


module.exports = {
  getBikes,getBikeById
};
