const mongoose = require('mongoose');
const { categoryModel } = require('./categoryModel');

const productSchema = new mongoose.Schema({
    title: {
        type: String, required: [true, "Enter Title"], trim: true
    },
    category: {
        type: [String], 
        validate: [
            {
                validator: (val) => {return val.length > 0;}, 
                message: "Please Enter atleast one category"
            }
        ]
    },
    featured: {
        type: Boolean, 
        default: false
    }, 
    sale: {
        type: Boolean, 
        default: false
    }, 
    popular: {
        type: String, 
        default: false
    },
    description: {
        type: String, required: [true, "Enter Description"], trim: true
    },
    price: {
        type: Number,
        required: [true, "Enter Price"],
        maxLength: [9, 'Price Cannot Exceed 9 Characters']
    },
    highlights:{
        type: Array
    },
    specifications: [
        {
            category: {
                type: String,
                required: [true, "Enter the specification category"]
            },
            content: [
                {
                    specTitle: {type: String, required: [true, 'Enter specification title']},
                    specValue: {type: String, required: [true, 'Enter spacification Content']}
                }
            ]
        }
    ],
    images: [
        {
            public_id:{type:String, required: true},
            url:{type: String, required: true}
        }
    ],
    stock: {
        type: Number,
        required: [true, 'Enter Product Stock'],
        maxLength: [5, 'Stock cannot have more than 5 characters'],
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an Interger Value'
        }
    },
    ratings: {
        count: {
            type: Number,
            default: 0
        },
        value: {
            type: Number,
            default: 0
        }
    },
    reviews: [
        {
            userId: {
                type:String, 
                required: true
            }, 
            username: {
                type:String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
            },
            title: {
                type: String, 
                required: true, 
                maxlength: [100, "Title length cannot exceed 100 characters"]
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ]

});

const productModel = mongoose.model('Product', productSchema);

module.exports = {
    productModel,
    productSchema
}