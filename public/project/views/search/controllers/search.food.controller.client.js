(function () {
    angular
        .module("FoodAppMaker")
        .controller("SearchController", SearchController);

    function SearchController($http, $location, $routeParams, currentUser, UserService) {
        var vm = this;
            vm.currentUser = currentUser;

        console.log("the curr user is"+currentUser);
        vm.searchRecipe = searchRecipe;
        vm.viewRecipe = viewRecipe;
        vm.userId = $routeParams.uid;
        vm.logout = logout;

        function searchRecipe(recipe) {

            var url ="https://api.edamam.com/search?q="+recipe+"&app_id=8ad19515&app_key=ceec8d097db8b2d50f1d6645d4a0efd4&from=0&to=30";

            $http.get(url)
                .success(function (results) {
                   // console.log(results);
                    vm.results = results;
                });
        }

function viewRecipe(uri) {
    var recipeId = uri.split('_')[1];
    vm.recipeId = recipeId;
    $location.url("/user/"+vm.userId+"/recipe/"+ vm.recipeId);
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