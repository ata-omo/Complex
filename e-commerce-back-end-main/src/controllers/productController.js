const {productModel: Product} = require("../models/productModel");
const {categoryModel: Category} = require('../models/categoryModel');
const CustomError = require("../utils/CustomError");
const Features = require("../utils/features");
const Cloudinary = require('../utils/configureCloudinary');
const fs = require("node:fs");
const CloudinaryUploader = require("../utils/cloudinaryUploder");

// create
const createProduct = async (req, res, next) => {
  try {

    let images = req.files.images;

    // uploading images on cloudinary
    for(let i=0; i<images.length; i++){
      let result = await CloudinaryUploader(images[i].data, {resource_type: "image", folder: "products"});

      images[i] = {
        public_id: result.public_id, 
        url: result.secure_url
      }
    }

    req.body.images = images;


    // typecasting price and stock as Number in case user sends string
    req.body.price = Number(req.body.price);
    req.body.stock = Number(req.body.stock);

    // storing product on mongodb
    const product = await Product.create(req.body);

    const categories = product.category;
    categories.forEach(async (item) => {
      await Category.updateOne({title: item.toLowerCase()}, {title: item.toLowerCase()}, {upsert: true})
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    next(new CustomError(400, err.message));
  }
};

// get all
const getAllProducts = async (req, res, next) => {
  try {
    const products = await new Features(Product, req.query).search();
    res.status(200).json({
      success: true,
      productCount: products.length,
      products
    });
  } catch (err) {
    next(err);
  }
};

//get one
const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new CustomError(404, "No Such Product Exists");
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// delete
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new CustomError(404, "No Such Product Exists");
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// update
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {

    if(req.files && req.files.images && req.files.images.length){
      let images = req.files.images;

      // uploading images on cloudinary
      for(let i=0; i<images.length; i++){
        let result = await CloudinaryUploader(images[i].data, {resource_type: "image", folder: "products"});

        images[i] = {
          public_id: result.public_id, 
          url: result.secure_url
        }
      }

      req.body.images = images;
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    if (!product) {
      throw new CustomError(404, "No Such Product Exists");
    }

    const categories = product.category;
    categories.forEach(async (item) => {
      await Category.updateOne({title: item.toLowerCase()}, {title: item.toLowerCase()}, {upsert: true})
    });


    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
