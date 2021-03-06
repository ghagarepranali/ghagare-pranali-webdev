(function () {
    angular
        .module("FoodAppMaker")
        .controller("RecipeController", RecipeController);

    function RecipeController($routeParams, $http, RecipeService, $location, currentUser, ReviewService, UserService) {
            var vm=this;
            vm.userId = $routeParams.uid;
            vm.rid = $routeParams.rid;
           // console.log("the rid is "+ vm.rid);
            vm.currentUser = currentUser;
            vm.addToFav = addToFav;
        vm.logout = logout;


        // vm.viewRecipe = viewRecipe;
           // console.log("1");
            vm.writeReview = writeReview;

        function init() {
//console.log("the rid is "+ vm.rid);
           var recipeSearchId = "https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_"+vm.rid
               +"&app_id=8ad19515&app_key=ceec8d097db8b2d50f1d6645d4a0efd4";
           vm.recipeSearchId = recipeSearchId;
           // console.log(recipeId);
           // console.log(recipeSearchId);
            $http.get(recipeSearchId)
                .success(function (response) {
                    //console.log(response);
                    vm.recipe = response[0];
                   // console.log(vm.recipe);
                   // $location.url("/recipe");
                }, function (err) {
                       // console.log("error");
                });

            ReviewService
                .findReviewsByRecipeId(vm.rid)
                .success(function (response) {
                    vm.reviewList = response;
                })

}
init();

function addToFav(recipe) {
    RecipeService.addToFav(vm.userId, recipe, vm.rid)
        .success(function (response) {
            vm.message="Successfully Liked";
           // console.log(vm.message);
            vm.setFlagForLiked = true;
        })
}

function writeReview(review) {
   // console.log("");
    $location.url("/user/"+vm.userId+"/review/"+vm.rid);
}

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

}
})();