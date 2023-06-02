const { categoryModel: Category } = require('../models/categoryModel');
const CustomError = require('../utils/CustomError');

// create category
const createCategory = async (req, res, next) => {
	try {
		const category = await Category.create(req.body);

		res.status(201).json({
			success: true,
			category,
		});
	} catch (err) {
		return next(new CustomError(400, err.message));
	}
};

// update category
const updateCategory = async (req, res, next) => {
	const { id } = req.query;
	try {
		const category = await Category.findByIdAndUpdate(id, res.body, {
			new: true,
			runValidators: true,
		});
		if (!category) {
			throw new CustomError(404, 'No Such Category Exists');
		}

		res.status(200).json({
			success: true,
			product: category,
		});
	} catch (err) {
		next(err);
	}
};

// delete category
const deleteCategory = async(req, res,next) => {
	try {

		const { id } = req.query;
		
		const category = await Category.findByIdAndDelete(id);
		if(!category) {
			return next(new CustomError(404, `No category exists with id: ${id}`));
		}

		res.json(200).json({
			success: true, 
			category
		});

	} catch (err) {
		next(err);
	}
};


// get all categories
const getAllCategory = async(req, res, next) => {
	try {

		const categories = await Category.find();

		res.status(200).json({
			success: true, 
			categories
		});
		
	} catch (err) {
		next(err);
	}
};


module.exports = {
	createCategory, 
	updateCategory, 
	deleteCategory, 
	getAllCategory
};