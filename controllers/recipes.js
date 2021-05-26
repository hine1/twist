
const Recipe = require('../models/Recipe');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const path=require('path');

//@desc			Get all recipes
//@route		GET /api/recipes
//@access		Public
exports.getRecipes = asyncHandler(async (req,res,next) => {
	const recipes = await Recipe.find();
	if (recipes)
		res.status(200).json({success:true,count: recipes.length, data:recipes});
	else 
		next(new ErrorResponse(`No recipes available`), 404);

});

//@desc			Get single recipe
//@route		GET /api/recipes/:id
//@access		Public
exports.getRecipe = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findById(req.params.id).populate('instructions');
	if (recipe)
		res.status(200).json({success:true,data:recipe});
	else 
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
});

//@desc			Get single recipe by name
//@route		GET /api/recipes/:slugs
//@access		Public
exports.getRecipeByName = asyncHandler(async (req,res,next) => {
	console.log(req.params);
	const recipe = await Recipe.findOne({slug: req.params.slug}).populate('instructions');
	if (recipe)
		res.status(200).json({success:true,data:recipe});
	else 
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
});

//@desc			Create new recipe
//@route		POST /api/recipes/
//@access		Private
exports.createRecipe = asyncHandler(async (req,res,next) => {
	console.log(req.body);
	//in order to access req.body, need a body parser middleware in server.js
	const recipe = await Recipe.create(req.body);
	res.status(200).json({success:true,data:recipe});
});

//@desc			Update a recipe
//@route		PUT /api/recipes/:id
//@access		Private
exports.updateRecipe = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});
	if (!recipe){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}
	res.status(200).json({success:true,data:recipe});
});

//@desc			Delete a recipe
//@route		DELETE /api/recipes/:id
//@access		Private
exports.deleteRecipe = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}
	recipe.remove();
	res.status(200).json({success:true});
});

//@desc			Upload photo for a recipe
//@route		PUT /api/recipes/:id/image
//@access		Private
exports.uploadRecipePhoto = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe){
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}
	if (!req.files){
		return next(new ErrorResponse(`Please upload a file`, 400));
	}
	const file = req.files.file;

	//Make sure the image is a photo
	if(!file.mimetype.startsWith('image')){
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	//check filesize
	if(file.size >process.env.MAX_FILE_UPLOAD){
		return next(new ErrorResponse(`please upload an image less than 
			${process.env.MAX_FILE_UPLOAD}`,400));
	}	

	//Create custom filename
	file.name = `image_${recipe._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
		if(err){
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`,500));
		}

		await Recipe.findByIdAndUpdate(req.params.id, {image: file.name});

		res.status(200).json({
			success: true,
			data:file.name
		});
	});
	console.log(file.name);
});
||||||| (empty tree)
=======
const Recipe = require('../models/Recipe');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const path=require('path');

//@desc			Get all recipes
//@route		GET /api/recipes
//@access		Public
exports.getRecipes = asyncHandler(async (req,res,next) => {
	const recipes = await Recipe.find();
	if (recipes)
		res.status(200).json({success:true,count: recipes.length, data:recipes});
	else 
		next(new ErrorResponse(`No recipes available`), 404);

});

//@desc			Get single recipe
//@route		GET /api/recipes/:id
//@access		Public
exports.getRecipe = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findById(req.params.id).populate('instructions');
	if (recipe)
		res.status(200).json({success:true,data:recipe});
	else 
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
});

//@desc			Get single recipe by name
//@route		GET /api/recipes/:slugs
//@access		Public
exports.getRecipeByName = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findOne({slug: req.params.slug}).populate('instructions');
	if (recipe)
		res.status(200).json({success:true,data:recipe});
	else 
		next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
});

//@desc			Create new recipe
//@route		POST /api/recipes/
//@access		Private
exports.createRecipe = asyncHandler(async (req,res,next) => {
	//A dd user to req.body
	req.body.user = req.user.id;
	const recipe = await Recipe.create(req.body);
	res.status(200).json({success:true,data:recipe});
});

//@desc			Update a recipe
//@route		PUT /api/recipes/:id
//@access		Private
exports.updateRecipe = asyncHandler(async (req,res,next) => {
	let recipe = await Recipe.findById(req.params.id);
	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to update this recipe`, 401));
	}

	recipe = await Recipe.findOneAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	}); 
	res.status(200).json({success:true,data:recipe});
});

//@desc			Delete a recipe
//@route		DELETE /api/recipes/:id
//@access		Private
exports.deleteRecipe = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}

	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to delete this recipe`, 401));
	}

	recipe.remove();

	res.status(200).json({success:true});
});

//@desc			Upload photo for a recipe
//@route		PUT /api/recipes/:id/image
//@access		Private
exports.uploadRecipePhoto = asyncHandler(async (req,res,next) => {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe){
		return next(new ErrorResponse(`No recipe with the id of ${req.params.id}`), 404);
	}
	// Make sure user is recipe owner
	if (recipe.user.toString() !== req.user.id){
		return next(new ErrorResponse(`User is not authorized to update this recipe`, 401));
	}
	
	if (!req.files){
		return next(new ErrorResponse(`Please upload a file`, 400));
	}
	const file = req.files.file;

	//Make sure the image is a photo
	if(!file.mimetype.startsWith('image')){
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	//check filesize
	if(file.size >process.env.MAX_FILE_UPLOAD){
		return next(new ErrorResponse(`please upload an image less than 
			${process.env.MAX_FILE_UPLOAD}`,400));
	}	

	//Create custom filename
	file.name = `image_${recipe._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
		if(err){
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`,500));
		}

		await Recipe.findByIdAndUpdate(req.params.id, {image: file.name});

		res.status(200).json({
			success: true,
			data:file.name
		});
	});
	console.log(file.name);
});
