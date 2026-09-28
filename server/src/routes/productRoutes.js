const {getProducts, getProductID, getCompatibleProducts} = require('../controllers/productController'); 


const express = require ('express'); 

const router = express.Router();

router.get('/', getProducts); 
router.get ('/compatible', getCompatibleProducts); 
router.get('/:id', getProductID ); 


module.exports = router; 