const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
	itemName: {
		type: String,
		trim: true,
		maxLength: [100, 'Name can not be more than 50 characters'],
		required:true
	},
	recipe: {
		type: mongoose.Schema.ObjectId,
		ref: 'Recipe',
		required: true
	}
});

module.exports = mongoose.model('Ingredient', IngredientSchema);