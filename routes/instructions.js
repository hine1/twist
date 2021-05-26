const express = require('express');
const {
	getInstructions,
	addInstruction,
	updateInstruction,
	deleteInstruction
} = require('../controllers/instructions');

const router = express.Router({mergeParams:true});

router.route('/').get(getInstructions).post(addInstruction);
router.route('/:id').put(updateInstruction).delete(deleteInstruction);

module.exports = router;