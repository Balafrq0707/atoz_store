const {Category} = require('../models')

const getCategories = async(req, res) => {
    try{
        const categories = await Category.findAll({
            attributes: [
                "id",
                "name",
                "slug",
                "description",
            ], 
            order: [
                ["name", "ASC"],
            ]
        })

        res.status(200).json({
            success: true, 
            data: categories
        })
    }
    
    catch(error){
        console.log("Error fetching categories", error); 
        res.status(500).json({
            success: false, 
            message: "Failed to fetch categories"
        })

    }
}

module.exports = {
  getCategories,
};