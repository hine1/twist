const express = require('express');
const {
	getIngredients,
	addIngredient,
	updateIngredient,
	deleteIngredient
} = require('../controllers/ingredients');

const router = express.Router({mergeParams:true});

router.route('/').get(getIngredients).post(addIngredient);
router.route('/:id').put(updateIngredient).delete(deleteIngredient);

module.exports = router;