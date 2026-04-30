import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        unique:true
    },
    description: {
        type:String,
        required:true
    },
    seller: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    price: {
        type:priceSchema,
        required:true
    },
    images: [
        {
            url:{
                type:String,
                required:true
            },
            
        }
    ],
    category: {
        type: String,
        enum: ['tees', 'pants', 'hoodies', 'jerseys', 'polos', 'tanktops'],
    },
    variants: [
        {
            size: {
                type: String,
                required: true,
                trim: true 
            },
            stock: {
                type: Number,
                required: true,
                min: [0, 'Stock cannot be negative'],
                default: 0
            },
            category: {
                type: String,
                enum: ['tees', 'pants', 'hoodies', 'jerseys', 'polos', 'tanktops'],
            }
        }
    ]
},{timestamps:true}
)

const productModel = mongoose.model('product',productSchema)

export default productModel