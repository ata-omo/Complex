const {productSchema} = require('../models/productModel');

class Features {
    // this.Model refers to the Mongoose Model for the query
    // this.query contains the request queries
    // this.maxLimit states the maximum number of objects, server will respond with
    constructor(Model, query){
        this.Model = Model;
        this.query = query;
        this.maxLimit = 20;
    }

    async search() {

        let {search:key, page, limit, sort, ...filters} = this.query;

        // Handling Illegal Query Parameters
        key = key ? key : "";
        page = page ? Math.max(page-1, 0) : 0;
        limit = limit ? Math.min(limit, this.maxLimit) : this.maxLimit;
        const skipBy = page*limit;
        let sortBy = sort ? sort.split(",") : [];
        if(sortBy[0]) sortBy[1] = sortBy[1] ? sortBy[1] : "asc";

        // Filtering out only those filters which are present in the Schema
        filters = Object.entries(filters).filter((key) => key in productSchema.obj);
        filters = {...filters};

        // Adding search key to filters object
        filters.description = {$regex: key, $options: 'i'};
        
        return await this.Model.find(filters).sort([sortBy]).skip(skipBy).limit(limit);
    }
}

module.exports = Features;