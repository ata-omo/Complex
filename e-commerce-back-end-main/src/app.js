const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({
    origin: '*', 
    credentials: true
}));

const handleErrorMiddleware = require('../src/middlewares/handleError');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const productReviewRoutes = require('./routes/productReviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

// use /api/v1 for all routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', productReviewRoutes);
app.use('/api/v1', orderRoutes);


// handleError Middleware
app.use(handleErrorMiddleware);


// export app
module.exports = app;