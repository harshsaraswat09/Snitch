import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
    amount:{
            type:Number,
            required:true
        },
        Currency:{
            type:String,
            enum:['USD','INR','GBP','EUR'],
            default:'INR'
        }
},{
    _id:false,
    _v:false
})

export default priceSchema