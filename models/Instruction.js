const mongoose = require('mongoose');

const InstructionSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required:true
	},
	createdAt:{
		type:Date,
		default: Date.now,
		required:true
	},
	recipe: {
		type: mongoose.Schema.ObjectId,
		ref: 'Recipe',
		required: true
	}
});

module.exports = mongoose.model('Instruction', InstructionSchema);