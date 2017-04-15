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
       /* function init() {
            vm.userId = $routeParams.uid;
            vm.keyword = $routeParams.kid;

            var url ="https://api.edamam.com/search?q="+vm.keyword+"&app_id=8ad19515&app_key=ceec8d097db8b2d50f1d6645d4a0efd4&from=0&to=30";
            //var url="http://openlibrary.org/search.json?q="+movie;
            // var url="https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title="+movie+"?api-key=72a9b83bdf6447f1ba3618c6d34ac648";
            $http.get(url)
                .success(function (results) {
                    console.log(results);
                    vm.results = results;
                });


        }
*/
        function searchRecipe(recipe) {
            //var url = "http://www.omdbapi.com/?s=" + movie.searchTitle;
            // var url = "https://api.sportradar.us/soccer-t3/eu/na/tournaments/sr:tournament:7/leaders.json?api_key=h39mpbtny558m2zmp5352ndb";
            //var url = "https://api.sportradar.us/soccer-t3/eu/na/schedules/2017-04-04/schedule.json?api_key=h39mpbtny558m2zmp5352ndb";
            //var url="https://www.goodreads.com/search.json?key=BhQOsBu1XuH3GgV9qEvFTw&q="+movie;
           // console.log(movie);
            //var url="http://api.eventful.com/json/events/search?app_key=NNTGFzG9rwcrwKPF&keywords="+movie;
            // var url="http://food2fork.com/api/search?key=a33183256c2490bb15fd42ef7e8b2a31&q="+movie;
            // console.log(url);
            var url ="https://api.edamam.com/search?q="+recipe+"&app_id=8ad19515&app_key=ceec8d097db8b2d50f1d6645d4a0efd4&from=0&to=30";
            //var url="http://openlibrary.org/search.json?q="+movie;
            // var url="https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title="+movie+"?api-key=72a9b83bdf6447f1ba3618c6d34ac648";
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