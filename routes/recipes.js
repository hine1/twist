const express = require('express');
const {
	getRecipes, 
	getRecipe,
	getRecipeByName, 
	createRecipe, 
	updateRecipe, 
	deleteRecipe,
	uploadRecipePhoto
} = require('../controllers/recipes');

//Include other resource routers
const ingredientRouter = require('./ingredients');
const instructionRouter = require('./instructions');

const router = express.Router();

//Re-route into other resource routers
router.use('/:recipeId/ingredients', ingredientRouter);
router.use('/:recipeId/instructions', instructionRouter);

router.route('/').get(getRecipes).post(createRecipe);

router.route('/:slug').get(getRecipeByName);

router.route('/:id').get(getRecipe).put(updateRecipe).delete(deleteRecipe);

router.route('/:id/image').put(uploadRecipePhoto);

module.exports= router; 

const express = require('express');
const {
	getRecipes, 
	getRecipe,
	getRecipeByName, 
	createRecipe, 
	updateRecipe, 
	deleteRecipe,
	uploadRecipePhoto
} = require('../controllers/recipes');
const {protect} = require('../middleware/auth');

//Include other resource routers
const ingredientRouter = require('./ingredients');
const instructionRouter = require('./instructions');

const router = express.Router();

//Re-route into other resource routers
router.use('/:recipeId/ingredients', ingredientRouter);
router.use('/:recipeId/instructions', instructionRouter);

router.route('/')
	.get(getRecipes)
	.post(protect, createRecipe);

router.route('/:slug')
	.get(getRecipeByName);

router.route('/:id')
	.get(getRecipe)
	.put(protect, updateRecipe)
	.delete(protect, deleteRecipe);

router.route('/:id/image')
	.put(protect, uploadRecipePhoto);

module.exports= router; 