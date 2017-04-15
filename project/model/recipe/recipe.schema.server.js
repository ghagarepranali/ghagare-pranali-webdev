module.exports = function () {
    var mongoose = require('mongoose');

    var RecipeSchema = mongoose.Schema({
        id: String,
        _user: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        title: String,
        imgUrl: String,
        source: String,
        shareAs: String,
        dietLabels: String,
        healthLabels: [String],
        ingredientLines: [String],
        dateCreated: {type:Date, default: Date.now()}
    },{collection: 'project.food.recipe'});

    return RecipeSchema;
    };