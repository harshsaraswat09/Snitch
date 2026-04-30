import cartModel from '../model/cart.model.js';
import mongoose from "mongoose";

export async function getCartDetails(userId) {
    let cart = (await cartModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
            }
        },
        // Unwind the items array
        { $unwind: { path: '$items' } },
        
        // Lookup the product details
        {
            $lookup: {
                from: 'products', // Must match your MongoDB collection name (usually lowercase plural)
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.product'
            }
        },
        { $unwind: { path: '$items.product' } },
        
        // Unwind the variants array to match the specific variant
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
        
        // Calculate item price
        {
            $addFields: {
                itemPrice: {
                    price: {
                        $multiply: [
                            '$items.quantity',
                            '$items.price.amount' // ✅ FIXED: Uses the price stored in the cart item
                        ]
                    },
                    // Note: Depending on your priceSchema, this might be .Currency instead of .currency
                    currency: '$items.price.currency' 
                }
            }
        },
        
        // Regroup back into a single cart object
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
    ]))[0];

    return cart;
}