const Instruction = require('../models/Instruction');
const Recipe = require('../models/Recipe');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc			Get all instructions
//@route		GET /api/recipes/:recipeId/instructions
//@access		Public
exports.getInstructions = asyncHandler(async (req,res,next) => {	
	if (req.params.recipeId){
		const instructions = await Instruction.find({recipe:req.params.recipeId}).sort('createdAt');
		res.status(200).json({success:true,count:instructions.length,data:instructions});	
	}
	else{
		const instructions = await Instruction.find().populate({
			path:'recipe',
			select: 'name',
		}).sort('createdAt');
		res.status(200).json({success:true,count:instructions.length,data:instructions});
	} 
	
});

//@desc			Add new instruction
//@route		POST /api/recipes/:recipeId/instructions
//@access		Private
exports.addInstruction = asyncHandler(async (req,res,next) => {
	req.body.recipe =  req.params.recipeId;
	const recipe = await Recipe.findById(req.params.recipeId);

	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.recipeId}`),404);
	}
	//in order to access req.body, need a body parser middleware in server.js
	const instruction = await Instruction.create(req.body);
	res.status(200).json({success:true,data:instruction});
});

//@desc			Update an instruction
//@route		PUT /api/instructions/:id
//@access		Private
exports.updateInstruction = asyncHandler(async (req,res,next) => {
	const instruction = await Instruction.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});
	if (!instruction){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}
	res.status(200).json({success:true,data:instruction});
});

//@desc			Delete an instruction
//@route		DELETE /api/instructions/:id
//@access		Private
exports.deleteInstruction = asyncHandler(async (req,res,next) => {
	const instruction = await Instruction.findById(req.params.id);
	if (!instruction){
		next(new ErrorResponse(`No instruction with the id of ${req.params.id}`), 404);
	}
	instruction.remove();
	res.status(200).json({success:true});
});
||||||| (empty tree)
=======
const Instruction = require('../models/Instruction');
const Recipe = require('../models/Recipe');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc			Get all instructions
//@route		GET /api/recipes/:recipeId/instructions
//@access		Public
exports.getInstructions = asyncHandler(async (req,res,next) => {	
	if (req.params.recipeId){
		const instructions = await Instruction.find({recipe:req.params.recipeId}).sort('createdAt');
		res.status(200).json({success:true,count:instructions.length,data:instructions});	
	}
	else{
		const instructions = await Instruction.find().populate({
			path:'recipe',
			select: 'name',
		}).sort('createdAt');
		res.status(200).json({success:true,count:instructions.length,data:instructions});
	} 
	
});

//@desc			Add new instruction
//@route		POST /api/recipes/:recipeId/instructions
//@access		Private
exports.addInstruction = asyncHandler(async (req,res,next) => {
	req.body.recipe =  req.params.recipeId;
	req.body.user = req.user.id;

	const recipe = await Recipe.findById(req.params.recipeId);

	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.recipeId}`),404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to alter this recipe`, 401));
	}

	//in order to access req.body, need a body parser middleware in server.js
	const instruction = await Instruction.create(req.body);
	res.status(200).json({success:true,data:instruction});
});

//@desc			Update an instruction
//@route		PUT /api/instructions/:id
//@access		Private
exports.updateInstruction = asyncHandler(async (req,res,next) => {
	let instruction = await Instruction.findById(req.params.id);

	if (!instruction){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to alter this recipe`, 401));
	}

	//in order to access req.body, need a body parser middleware in server.js
	instruction = await Instruction.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});

	res.status(200).json({success:true,data:instruction});
});

//@desc			Delete an instruction
//@route		DELETE /api/instructions/:id
//@access		Private
exports.deleteInstruction = asyncHandler(async (req,res,next) => {
	let instruction = await Instruction.findById(req.params.id);

	if (!instruction){
		next(new ErrorResponse(`No instruction with the id of ${req.params.id}`), 404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to alter this recipe`, 401));
	}

	//in order to access req.body, need a body parser middleware in server.js
	instruction = await Instruction.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});

	instruction.remove();

	res.status(200).json({success:true});
});
