<<<<<<< HEAD
const mongoose = require('mongoose');
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});

	console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;	
||||||| (empty tree)
=======
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try{
		const conn = await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log(`MongoDB Connected ${conn.connection.host}`);
	}catch (err){
		console.error(err.message);
		process.exit(1);
	}
}

module.exports = connectDB;	
>>>>>>> 58c4d89 (implement user authentication and authorization)
