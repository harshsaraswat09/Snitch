import { Router } from "express";
import { identifyUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validator/cart.validator.js";
import { getCart, addToCart, updateCartItem, removeFromCart, createOrderController } from "../controller/cart.controller.js";


const router = Router()


/**
 * @route POST api/cart/add/:productId/:varientId
 * @desc add items in cart
 * @access Private
 * @argument productId - Id of the product to add
 * @argument variantId - Id of the variant to add
 * @argument quantity - Quantity of the item to add (default :1)
 */
router.post("/add/:productId/:variantId",identifyUser,validateAddToCart,addToCart)


/**
 * @route GET /api/cart
 * @desc Get user's cart 
 * @access Private
 */
router.get("/", identifyUser, getCart)

/**
 * @route PUT /api/cart/update/:productId/:variantId
 * @desc Update item quantity in cart
 * @access Private
 */
router.put("/update/:productId/:variantId", identifyUser, updateCartItem)

/**
 * @route DELETE /api/cart/remove/:productId/:variantId
 * @desc Remove item from cart
 * @access Private
 */
router.delete("/remove/:productId/:variantId", identifyUser, removeFromCart)


router.post("/payment/create/order", identifyUser , createOrderController )

export default router