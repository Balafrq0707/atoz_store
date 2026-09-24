const {
  Product,
  Category,
  ProductVariant,
  Bike,
  ProductBike,
} = require("../models");

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
            return res.status(404).json({
            success: false,
            message: "Bike ID is required",
        });
   }

    try{
        const product = await Product.findByPk(bikeId, {

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
                model: ProductBike, 
                as: "compatibleBikes", 
                required: true, 
                attributes: ['id', 'productId', 'bikeId']
                }, 

                {
                model: Bike,
                as: "compatibleBikes", 
                required: true, 
                attributes: [
                                "id",
                                "brand",
                                "model",
                                "year",
                                "variant",
                            ],

                },
            ], 
                order: [["name", "ASC"]],
                through: {attributes: [],}

        }
        )

        if (!product) {
                return res.status(404).json({
                success: false,
                message: "Bike not found",
            });
            }

    }
    catch (error) {
    console.log("Error fetching compatible products:", error);

    res.status(500).json({
      success: false,
      message: "Fetching failed",
    });
  }
    
}

module.exports = {
  getProducts,
  getProductID,
};