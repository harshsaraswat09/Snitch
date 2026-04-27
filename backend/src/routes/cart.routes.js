import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart, validateIncrementCartItemQuantity } from '../validators/cart.validator.js';
import { addToCart, getCart, incrementCartItemQuantity, createOrderController } from '../controllers/cart.controller.js';


const router = express.Router();


/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart
 * @access Private
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */
router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)



/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.get('/', authenticateUser, getCart)


/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @desc Increment item quantity in cart by 1
 * @access Private
 * @argument productId - id of product to update
 * @argument variantID - ID of the variant to update
 * @argument quantity - New Quantity of the item 

*/ 

router.patch("/quantity/increment/:productId/:variantId", authenticateUser,validateIncrementCartItemQuantity , incrementCartItemQuantity)


router.post("/payment/create/order", authenticateUser, createOrderController)

export default router;