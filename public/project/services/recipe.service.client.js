
(function () {
    angular
        .module("FoodAppMaker")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {

        var api = {
            "addToFav": addToFav,
            "findRecipeById": findRecipeById,
            "findRecipe": findRecipe
        };

        return api;
        
        function addToFav(userId, recipe, rid) {
            return $http.post("/api/user/"+userId+"/recipe/"+rid, recipe);
        }

        function findRecipeById(rid) {
            var recipeSearchId = "https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_"+rid
                +"&app_id=8ad19515&app_key=ceec8d097db8b2d50f1d6645d4a0efd4";
           // vm.recipeSearchId = recipeSearchId;
            // console.log(recipeId);
           // console.log(recipeSearchId);
           return $http.get(recipeSearchId);
        }
        
        function findRecipe(recipeid) {
            return $http.get("/api/find/recipe/"+recipeid);
        }
    }
})();