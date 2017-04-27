(function () {
    angular
        .module("FoodAppMaker")
        .controller("ReviewController", ReviewController);

    function ReviewController(UserService, ReviewService, $routeParams, $http, currentUser, $location) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.userId = $routeParams.uid;
        vm.rid = $routeParams.rid;
        vm.submitReview = submitReview;
        vm.currentUser = currentUser;
        vm.logout= logout;

        function init() {

            // var recipeSearchId = vm.rid.replace(/#/g, "%23");
            var recipeSearchId = "https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_"+vm.rid
                +"&app_id=8ad19515&app_key=ceec8d097db8b2d50f1d6645d4a0efd4";
            vm.recipeSearchId = recipeSearchId;
            // console.log(recipeId);
            //console.log(recipeSearchId);
            $http.get(recipeSearchId)
                .success(function (response) {
                   // console.log(response);
                    vm.recipe = response[0];
                    //console.log(vm.recipe);
                    // $location.url("/recipe");
                }, function (err) {
                    //console.log("error");
                });

        }
        init();


       // vm.findPendingCriticReviews = findPendingCriticReviews;


        function submitReview(review) {
            //vm.review = review;
            //console.log("in rrr  "+vm.recipe.label);
            //console.log("in iiiii "+vm.recipe.image);
            var reviewNew = {
                userId: vm.userId,
                recipeId: vm.rid,
                description: review.description,
                recipeName: vm.recipe.label,
                recipeImg: vm.recipe.image
            };
            ReviewService.submitReview(vm.userId, vm.rid, reviewNew)
                .then(function () {
                   // console.log("setting msg");
                    vm.message = "Review is submitted successfully";
                }, function (err) {
                    vm.error = "Error in review submission. Try again later";
                })
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