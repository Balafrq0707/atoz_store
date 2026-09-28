const {
  Product,
  Category,
  ProductVariant,
  Bike,
} = require("../models");

const { Op } = require("sequelize");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "slug",
        "description",
        "classification",
        "imageUrl",
        "isActive",
      ],
      include: [
        {
          model: Category,
          as: "category",
          required: true,
          attributes: ["id", "name", "slug"],
        },
      ],
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Product fetching failed",
    });
  }
};

const getProductID = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Product ID is required",
    });
  }

  try {
    const product = await Product.findByPk(id, {
      attributes: [
        "id",
        "name",
        "slug",
        "description",
        "classification",
        "imageUrl",
        "isActive",
      ],

      include: [
        {
          model: Category,
          as: "category",
          required: true,
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductVariant,
          as: "variants",
          required: true,
          attributes: [
            "id",
            "variantName",
            "sku",
            "partNumber",
            "price",
            "stockQuantity",
            "lowStockThreshold",
            "isActive",
          ],
        },
        {
          model: Bike,
          as: "compatibleBikes",
          required: false,
          attributes: [
            "id",
            "brand",
            "model",
            "year",
            "variant",
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });

    console.log("The requested product:", product); 

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log("Error fetching product:", error);

    res.status(500).json({
      success: false,
      message: "Product fetching failed",
    });
  }
};

const getCompatibleProducts = async (req, res)=> {

    const bikeId = req.query.bikeId; 

    if (!bikeId) {
            return res.status(400).json({
            success: false,
            message: "Bad Request",
        });
   }

    try{
        const bike = await Bike.findByPk(bikeId, {

            attributes: [
                "id",
                "brand",
                "model",
                "year",
                "variant",
            ],

            include: [

                {
                model: Product,
                as: "compatibleProducts", 
                required: false, 
                attributes: [
                                "id",
                                "name",
                                "slug",
                                "description",
                                "classification",
                                "imageUrl",
                                "isActive",
                            ],
                through: {attributes: [],},
                },
            ], 
        }
        )

        if (!bike) {
                return res.status(404).json({
                success: false,
                message: "Bike not found",
            });
            }
        res.status(200).json({
          success: true, 
          data: bike
        })

    }
    catch (error) {
    console.log("Error fetching compatible products:", error);

    res.status(500).json({
      success: false,
      message: "Fetching failed",
    });
  }
    
}

const searchProducts = async (req, res) => {
  const { q } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  try {
    const products = await Product.findAll({
      where: {
        isActive: true,
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${q.trim()}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${q.trim()}%`,
            },
          },
        ],
      },

      attributes: [
        "id",
        "name",
        "slug",
        "description",
        "classification",
        "imageUrl",
        "isActive",
      ],

      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductVariant,
          as: "variants",
          required: false,
          attributes: [
            "id",
            "variantName",
            "sku",
            "partNumber",
            "price",
            "stockQuantity",
            "isActive",
          ],
        },
      ],

      order: [["name", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error searching products:", error);

    return res.status(500).json({
      success: false,
      message: "Product search failed",
    });
  }
};

module.exports = {
  getProducts,
  getProductID, getCompatibleProducts, searchProducts
};
