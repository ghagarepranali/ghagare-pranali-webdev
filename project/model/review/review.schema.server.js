module.exports = function () {
    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        userId: String,
        username: String,
        recipeId: String,
        recipeName: String,
        recipeImg: String,
        description: String,
        title: String,
        rating: String,
        isCritic: {type:Boolean, default: false},
        dateCreated: {type:Date, default: Date.now()}
    },{collection: 'project.food.review'});

    return ReviewSchema;
};