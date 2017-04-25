module.exports = function () {

    // var mongoose = require('mongoose');

    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;

    var RecipeSchema = require('./recipe.schema.server')();
    var RecipeModel = mongoose.model('RecipeModel', RecipeSchema);



    var api = {
        "setModel": setModel,
        "addToFav": addToFav,
        "findRecipe": findRecipe
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function addToFav(userId, recipe) {
        return RecipeModel.findOne({id: recipe.id})
            .exec()
            .then(function (response) {
                if(response != null){
                   return RecipeModel.update({id: recipe.id}, {$addToSet:{_user: userId}})
                        .then(function (recipe1) {
                          return model.userModel.findUserById(userId)
                                .then(function (user) {
                                    user.likes.push(recipe1._id);
                                    user.save();
                                });
                        });

                } else {
                    RecipeModel.create(recipe)
                        .then(function (recipe1) {
                         return model.userModel.findUserById(userId)
                                .then(function (user) {
                                    user.likes.push(recipe1._id);
                                    user.save();
                                });
                        })

                }
            }, function (err) {
                return err;
            });
        //return RecipeModel.create(recipe);
    }

    function findRecipe(recipeId) {
        return RecipeModel.findById(recipeId);
    }

};