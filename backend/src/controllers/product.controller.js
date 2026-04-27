import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;

    const seller = req.user;

    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "INR",
      },
      images,
      seller: seller._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create product",
      success: false,
    });
  }
}

export async function getSellerProducts(req, res) {
  try {
    const seller = req.user;

    const products = await productModel.find({
      seller: seller._id,
    });

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
      success: false,
    });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
      success: false,
    });
  }
}

export async function getProductDetails(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product details fetched successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch product details",
      success: false,
    });
  }
}

export async function addProductVariant(req, res) {
  try {
    const productId = req.params.productId;

    const product = await productModel.findOne({
      _id: productId,
      seller: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const files = req.files;
    const images = [];
    if (files && files.length !== 0) {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
          });
        }),
      );
      images.push(...uploaded);
    }

    const price = req.body.priceAmount;
    const stock = req.body.stock;
    const rawAttributes = JSON.parse(req.body.attributes || "{}");

    const attributes = {};
    Object.entries(rawAttributes).forEach(([key, value]) => {
      attributes[key.trim().toLowerCase()] = value.trim();
    });

    product.variants.push({
      images,
      price: {
        amount: Number(price) || product.price.amount,
        currency: req.body.priceCurrency || product.price.currency,
      },
      stock,
      attributes,
    });

    await product.save();

    return res.status(200).json({
      message: "Product variant added successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add product variant",
      success: false,
    });
  }
}