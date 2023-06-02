const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Category Title cannot be empty"]
    }, 
    popular: {
        type: Boolean
    }, 
    images:[{
        public_id:{type:String},
        src:{type: String, required: true}
    }]
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = {
    categoryModel
};