
const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc			Get all ingredients
//@route		GET /api/recipes/:recipeId/ingredients
//@access		Public
exports.getIngredients = asyncHandler(async (req,res,next) => {	
	if (req.params.recipeId){
		const ingredients = await Ingredient.find({recipe:req.params.recipeId});
		res.status(200).json({success:true,count:ingredients.length,data:ingredients});	
	}
	else{
		const ingredients = await Ingredient.find().populate({
			path:'recipe',
			select: 'name'
		});
		res.status(200).json({success:true,count:ingredients.length,data:ingredients});
	} 
	
});

//@desc			Add new ingredient
//@route		POST /api/recipes/:recipeId/ingredients
//@access		Private
exports.addIngredient = asyncHandler(async (req,res,next) => {
	req.body.recipe =  req.params.recipeId;
	const recipe = await Recipe.findById(req.params.recipeId);

	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.recipeId}`),404);
	}
	//in order to access req.body, need a body parser middleware in server.js
	const ingredient = await Ingredient.create(req.body);
	res.status(200).json({success:true,data:ingredient});
});

//@desc			Update an ingredient
//@route		PUT /api/ingredients/:id
//@access		Private
exports.updateIngredient = asyncHandler(async (req,res,next) => {
	const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});
	if (!ingredient){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}
	res.status(200).json({success:true,data:ingredient});
});

//@desc			Delete an ingredient
//@route		DELETE /api/ingredients/:id
//@access		Private
exports.deleteIngredient = asyncHandler(async (req,res,next) => {
	const ingredient = await Ingredient.findById(req.params.id);
	if (!ingredient){
		next(new ErrorResponse(`No ingredient with the id of ${req.params.id}`), 404);
	}
	ingredient.remove();
	res.status(200).json({success:true});
});
||||||| (empty tree)
=======
const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc			Get all ingredients
//@route		GET /api/recipes/:recipeId/ingredients
//@access		Public
exports.getIngredients = asyncHandler(async (req,res,next) => {	
	if (req.params.recipeId){
		const ingredients = await Ingredient.find({recipe:req.params.recipeId});
		res.status(200).json({success:true,count:ingredients.length,data:ingredients});	
	}
	else{
		const ingredients = await Ingredient.find().populate({
			path:'recipe',
			select: 'name'
		});
		res.status(200).json({success:true,count:ingredients.length,data:ingredients});
	} 
	
});

//@desc			Add new ingredient
//@route		POST /api/recipes/:recipeId/ingredients
//@access		Private
exports.addIngredient = asyncHandler(async (req,res,next) => {
	req.body.recipe =  req.params.recipeId;
	req.body.user = req.user.id;

	const recipe = await Recipe.findById(req.params.recipeId);

	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.recipeId}`),404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to add ingredients to this recipe`, 401));
	}

	//in order to access req.body, need a body parser middleware in server.js
	const ingredient = await Ingredient.create(req.body);

	res.status(200).json({success:true,data:ingredient});
});

//@desc			Update an ingredient
//@route		PUT /api/ingredients/:id
//@access		Private
exports.updateIngredient = asyncHandler(async (req,res,next) => {
	let ingredient = await Ingredient.findById(req.params.id);
	if (!ingredient){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to alter this recipe`, 401));
	}

	ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});

	res.status(200).json({success:true,data:ingredient});
});

//@desc			Delete an ingredient
//@route		DELETE /api/ingredients/:id
//@access		Private
exports.deleteIngredient = asyncHandler(async (req,res,next) => {
	const ingredient = await Ingredient.findById(req.params.id);

	if (!ingredient){
		next(new ErrorResponse(`No ingredient with the id of ${req.params.id}`), 404);
	}
	
	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to alter this recipe`, 401));
	}

	ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});

	ingredient.remove();

	res.status(200).json({success:true});
});
