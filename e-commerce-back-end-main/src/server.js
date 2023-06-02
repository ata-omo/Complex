const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

// 	[ERROR HANDLING] Handling Uncaught exception
process.on('uncaughtException', (err) => {
	console.log(`ERROR: ${err.stack}`);
	console.log('Shutting down the server due to Uncaught Exception');
	
	process.exit(1);
});


const app = require("./app");
const connnectDatabase = require('./database');

connnectDatabase();

const server = app.listen(process.env.PORT, () => {
console.log(`server is listening to port: ${process.env.PORT}`);
});


// 	[ERROR HANDLING] Handling Unhandled Rejection
process.on('unhandledRejection', (err) => {
	console.log(`ERROR: ${err.stack}`);
	console.log('Shutting down the server due to Unhandled Rejection');
	
	server.close(() => {
		process.exit(1);
	});
});