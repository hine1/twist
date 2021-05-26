const mongoose = require('mongoose');
const slugify = require('slugify');

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
		unique:true,
		trim: true,
		required: [true, 'Please add a name for the recipe'],
		maxLength: [50, 'Name can not be more than 50 characters']
	},
	slug: String,
	image: {
		type: String,
		default: 'no-photo.jpg'
	}
}, {
	toJSON: {virtuals:true},
	toObject: {virtuals:true}
});

//Create recipe slug from the name
RecipeSchema.pre('save', function(next){
	this.slug=slugify(this.name,{lower:true});
	next();
});

//Cascade delete ingredients and instructions when a recipe is deleted
RecipeSchema.pre('remove', async function(next){
	await this.model('Ingredient').deleteMany({recipe: this._id});
	next();
});
RecipeSchema.pre('remove', async function(next){
	await this.model('Instruction').deleteMany({recipe: this._id});
	next();
});


//Reverse populate with virtuals 
RecipeSchema.virtual('ingredients',{
	ref: 'Ingredient',
	localField: '_id',
	foreignField: 'recipe',
	justOne:false
});

RecipeSchema.virtual('instructions',{
	ref: 'Instruction',
	localField: '_id',
	foreignField: 'recipe',
	justOne:false
});

module.exports = mongoose.model('Recipe', RecipeSchema);
||||||| (empty tree)
=======
const mongoose = require('mongoose');
const slugify = require('slugify');

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
		unique:true,
		trim: true,
		required: [true, 'Please add a name for the recipe'],
		maxLength: [50, 'Name can not be more than 50 characters']
	},
	slug: String,
	image: {
		type: String,
		default: 'no-photo.jpg'
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}
}, {
	toJSON: {virtuals:true},
	toObject: {virtuals:true}
});

//Create recipe slug from the name
RecipeSchema.pre('save', function(next){
	this.slug=slugify(this.name,{lower:true});
	next();
});

//Cascade delete ingredients and instructions when a recipe is deleted
RecipeSchema.pre('remove', async function(next){
	await this.model('Ingredient').deleteMany({recipe: this._id});
	next();
});
RecipeSchema.pre('remove', async function(next){
	await this.model('Instruction').deleteMany({recipe: this._id});
	next();
});


//Reverse populate with virtuals 
RecipeSchema.virtual('ingredients',{
	ref: 'Ingredient',
	localField: '_id',
	foreignField: 'recipe',
	justOne:false
});

RecipeSchema.virtual('instructions',{
	ref: 'Instruction',
	localField: '_id',
	foreignField: 'recipe',
	justOne:false
});

module.exports = mongoose.model('Recipe', RecipeSchema);
