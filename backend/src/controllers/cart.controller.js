import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";
import mongoose from "mongoose"
import { createOrder } from "../services/payment.service.js";


async function getCartDetails(userId){
    let cart = (await cartModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
            }
        },
        { $unwind: { path: '$items' } },
        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.product'
            }
        },
        { $unwind: { path: '$items.product' } },
        {
            $unwind: { path: '$items.product.variants' }
        },
        {
            $match: {
                $expr: {
                    $eq: [
                        '$items.variant',
                        '$items.product.variants._id'
                    ]
                }
            }
        },
        {
            $addFields: {
                itemPrice: {
                    price: {
                        $multiply: [
                            '$items.quantity',
                            '$items.product.variants.price.amount'
                        ]
                    },
                    currency:
                        '$items.product.variants.price.currency'
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                totalPrice: { $sum: '$itemPrice.price' },
                currency: {
                    $first: '$itemPrice.currency'
                },
                items: { $push: '$items' }
            }
        }
    ]))[ 0 ]

    return cart
}

export const addToCart = async (req, res) => {
    try {
        const { productId, variantId } = req.params
        const { quantity = 1 } = req.body

        const product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })

        if (!product) {
            return res.status(404).json({
                message: "Product or variant not found",
                success: false
            })
        }

        const stock = await stockOfVariant(productId, variantId)

        const cart = (await cartModel.findOne({ user: req.user._id })) ||
            (await cartModel.create({ user: req.user._id }))

        const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

        if (isProductAlreadyInCart) {
            const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId).quantity
            if (quantityInCart + quantity > stock) {
                return res.status(400).json({
                    message: `Only ${stock} items left in stock. You already have ${quantityInCart} in your cart`,
                    success: false
                })
            }

            await cartModel.findOneAndUpdate(
                { user: req.user._id, "items.product": productId, "items.variant": variantId },
                { $inc: { "items.$.quantity": quantity } },
                { new: true }
            )

            return res.status(200).json({
                message: "Cart updated successfully",
                success: true
            })
        }

        if (quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock`,
                success: false
            })
        }

        cart.items.push({
            product: productId,
            variant: variantId,
            quantity,
            price: product.price
        })

        await cart.save()

        return res.status(200).json({
            message: "Product added to cart successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add item to cart",
            success: false
        })
    }
}

export const getCart = async (req, res) => {
    try {
        const user = req.user

        let cart = await getCartDetails(user._id)

        if (!cart) {
            await cartModel.create({ user: user._id })
            cart = { items: [], totalPrice: 0 }
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            success: true,
            cart
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch cart",
            success: false
        })
    }
}


export const incrementCartItemQuantity = async (req, res) => {
    try {
        const { productId, variantId } = req.params

        const product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })

        if (!product) {
            return res.status(404).json({
                message: "Product or variant not found",
                success: false
            })
        }

        const cart = await cartModel.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }

        const stock = await stockOfVariant(productId, variantId)

        const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)?.quantity || 0

        if (itemQuantityInCart + 1 > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. You already have ${itemQuantityInCart} in your cart`,
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart item quantity incremented successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to increment cart item",
            success: false
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId, variantId } = req.params

        const cart = await cartModel.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { product: productId, variant: variantId } } },
            { new: true }
        )

        return res.status(200).json({
            message: "Item removed from cart successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to remove item from cart",
            success: false
        })
    }
}

export const createOrderController = async (req, res) => {
    try {
        const cart = await getCartDetails(req.user._id)

        if (!cart || !cart.items.length) {
            return res.status(400).json({
                message: "Cart is empty",
                success: false
            })
        }

        const order = await createOrder(cart.totalPrice, cart.currency || "INR")

        return res.status(200).json({
            message: "Order created successfully",
            success: true,
            order
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create order",
            success: false
        })
    }
}