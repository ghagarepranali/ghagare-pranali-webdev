module.exports = function (app, recipeModel, userModel) {

   // app.get("/api/recipe", viewRecipe);
    app.post("/api/user/:userId/recipe/:rid", addToFav);
    app.get("/api/find/recipe/:recipeid", findRecipe);


    function addToFav(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        var recipeId = req.params.rid;
        var newRecipe = req.body;
        var recipe = {
            id: recipeId,
            _user: userId,
            title: newRecipe.label,
            imgUrl: newRecipe.image,
            ingredientLines: newRecipe.ingredientLines
    };
       /* userModel
            .addRecipeToUser(userId, recipe)
            .then(function (response) {
                if (response.nModified == 1){
                    recipeModel
                        .addToFav(userId, recipe)
                        .then(function () {
                            console.log("added server");
                        })
                }

            })
*/

        recipeModel
            .addToFav(userId, recipe)
            .then(function (response) {
                    userModel
                        .addRecipeToUser(userId, recipe)
                        .then(function (response) {
                            res.sendStatus(200);
                        },function (err) {
                           res.sendStatus(500);
                        });


            })


    }

    function findRecipe(req, res) {
        var rid = req.params.recipeid;
        console.log("in server" +rid);
    recipeModel.findRecipe(rid).
        then(function (recipe) {
        res.json(recipe);
    }, function (err) {
        res.sendStatus(500);
    })
    }
};