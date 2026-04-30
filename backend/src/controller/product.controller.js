import productModel from "../model/product.model.js";
import ImageKit from "@imagekit/nodejs";
import { uploadFile } from "../service/storage.service.js";

export async function createProduct(req,res){

    const {title, priceAmount, priceCurrency, description ,category} = req.body 
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file)=>{
        return await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname
        })
    }))

    const product = await productModel.create({
        title,
        description,
        price:{
            amount:priceAmount,
            currency:priceCurrency || 'INR'
        },
        images,
        seller:seller._id,
        category
    })

    res.status(201).json({
        message:"product created successfully",
        success:true,
        product
    })
}

export async function getSellerProducts(req,res){
    const seller =req.user

    const products = await productModel.find({ seller:seller._id })

    res.status(200).json({
        message:"Products fetched successfully",
        success:true,
        products
    })
}

export async function getAllProducts(req,res){
    const products = await productModel.find()

    res.status(200).json({
        message:"product fetched successfully",
        success:true,
        products
    })
}

export async function getProductDetails(req,res){
    const {id} =req.params

    const product = await productModel.findById(id)

    if(!product){
        return res.status(404).json({
            message:"Product not found",
            success:false
        })
    }

    return res.status(200).json({
            message:"Product details fetched Successfully",
            success:true,
            product
        })
}

export async function addProductVarient(req,res){

    const productId= req.params.id

    const product = await productModel.findOne({
        _id:productId,
        seller:req.user._id
    })

    if(!product){
        return res.status(404).json({
            message:"Product not found",
            success:false
        })
    }
    
    const stock = req.body.stock
    const size = req.body.size
    const category = req.body.category 

    product.variants.push({
        size,
        stock,
        category
    })

    await product.save()

    return res.status(200).json({
        message:"Product varient added successfully",
        success:true,
        product
    })

}

export async function updateProductCategory(req, res) {
    const productId = req.params.id;
    const { category } = req.body;

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        });
    }

    product.category = category;
    await product.save();

    return res.status(200).json({
        message: "Product category updated successfully",
        success: true,
        product
    });
}