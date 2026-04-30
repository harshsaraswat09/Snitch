import { Router } from 'express'
import { authenticateSeller } from '../middleware/auth.middleware.js'
import { createProduct, getAllProducts, getSellerProducts ,getProductDetails, addProductVarient, updateProductCategory} from '../controller/product.controller.js'
import multer from 'multer'
import { createProductValidator } from '../validator/product.validator.js'

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

const router = Router()


/**
 * @route POST /api/products/seller
 * @desc create a new product
 * @access Private (Seller only)
 */
router.post('/',authenticateSeller,upload.array('images',7),createProductValidator,createProduct)

/**
 * @route GET /api/products/seller
 * @desc get all the created products
 * @access Private (Seller only)
 */
router.get('/seller',authenticateSeller,getSellerProducts)

/**
 * @route POST /api/products/
 * @desc fetch all the products
 * @access Public
 */
router.get("/",getAllProducts)


/**
 * @route POST /api/products/detail/:id
 * @desc fetch detail of single product
 * @access Private
 */
router.get("/detail/:id",getProductDetails)


/**
 * @route POST /api/products/:id/variants
 * @desc add new varient to the  product
 * @access Private
 */
router.post("/:id/variants",authenticateSeller , upload.array('images',7), addProductVarient)

/**
 * @route PUT /api/products/:id/category
 * @desc Update the category of a product
 * @access Private (Seller only)
 */
router.put("/:id/category", authenticateSeller, updateProductCategory)

export default router