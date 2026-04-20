import express from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js"
import { createProduct, getAllProducts, getSellerProducts, getProductDetails } from "../controllers/product.controller.js"
import multer from "multer"
import { createProductValidator } from "../validators/product.validator.js"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})


const router = express.Router()

/**
 * @route POST /api/products
 * @description Create a new producy
 * @access Private (Seller Only)
 */
router.post("/", authenticateSeller, upload.array("images", 7),createProductValidator,  createProduct )

/**
 * @route GET /api/products/seller
 * @description Get all products
 * @access Public
 */
router.get("/seller", authenticateSeller, getSellerProducts )

/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get("/", getAllProducts)


/**
 * @route GET /api/products/detail/:id
 * @description Get product dteialsby id
 * @access Public
 */
router.get("/detail/:id", getProductDetails)



export default router