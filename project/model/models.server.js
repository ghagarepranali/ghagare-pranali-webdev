module.exports = function () {

    var userModel = require("./user/user.model.server")();
    var recipeModel = require("./recipe/recipe.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var model = {
        userModel: userModel,
        recipeModel: recipeModel,
        reviewModel: reviewModel
    };

    userModel.setModel(model);
    recipeModel.setModel(model);
    reviewModel.setModel(model);
    return model;
};