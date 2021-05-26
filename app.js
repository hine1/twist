const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app=express();


//Connect to database
connectDB();


app.use(express.json());

app.get('/', (req, res) =>{
	res.send('Hello World')
});

//Mount router
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/instructions', require('./routes/instructions'));

const PORT = process.env.PORT || 5000;

app.listen(
	PORT, 
	() => console.log(`Server running  on port ${PORT}`)
);