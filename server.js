const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app=express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.get('/', (req, res) =>{
	res.send('Hello World')
});

//Mount router
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/instructions', require('./routes/instructions'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(
	PORT, 
	() => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);