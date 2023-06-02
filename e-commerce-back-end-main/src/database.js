const mongoose = require('mongoose');

const connnectDatabase = async() => {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to Database Cluster");
}

module.exports = connnectDatabase;