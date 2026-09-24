const { Bike } = require("../models");

const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.findAll({
      attributes: [
        "id",
        "brand",
        "model",
        "year",
        "variant",
      ],
      order: [
        ["brand", "ASC"],
        ["model", "ASC"],
        ["year", "ASC"],
      ],
    });

    res.status(200).json({
      success: true,
      data: bikes,
    });
  } catch (error) {
    console.error("Error fetching bikes:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bikes",
    });
  }
};

module.exports = {
  getBikes,
};
