(function () {
    angular
        .module("FoodAppMaker")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/search/templates/search.food.view.client.html",
                resolve: {
                    currentUser: checkCurrentUser
                },
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/login", {
            templateUrl: "views/user/templates/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
        })
            .when("/admin", {
            templateUrl: "views/user/templates/admin.view.client.html",
                resolve: {
                    adminUser: checkAdmin
                },
            controller: "AdminController",
            controllerAs: "model"
        })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
            templateUrl: "views/user/templates/profile.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
            controller: "ProfileController",
            controllerAs: "model"

        })
            .when("/user/:uid/search", {
            templateUrl: "views/search/templates/search.food.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
            controller: "SearchController",
            controllerAs: "model"
        })
            .when("/user/:uid/recipe/:rid", {
            templateUrl: "views/search/templates/recipe.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
            controller: "RecipeController",
            controllerAs: "model"
        })
            .when("/user/:uid/review/:rid", {
                templateUrl: "views/review/templates/critic.review.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
                controller: "ReviewController",
                controllerAs: "model"

            })
            .when("/user/other/:uid", {
                templateUrl: "views/user/templates/profile.other.user.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
                controller: "ProfileController",
                controllerAs: "model"
            })
                    .otherwise({
            // Default
            templateUrl: "views/search/templates/search.food.view.client.html"
        });

    }

    function checkCurrentUser($q, UserService) {
        // logout in the bginning
        var defer = $q.defer();
        UserService
            .loggedin()
            .then(function (user) {
                //console.log("in");
                if(user != '0') {

                    defer.resolve(user);

                } else {
                    defer.resolve(null);

                }
            });
        return defer.promise;

    }
    function checkLoggedIn($q, UserService, $location) {
        var defer = $q.defer();
        UserService
            .loggedin()
            .then(function (user) {
                //console.log("in");
                if(user != '0') {

                    defer.resolve(user);

                    if(user.roles == "ADMIN"){
                       // console.log("role "+user.roles);
                        $location.url("/admin");
                    }

                } else {
                    defer.reject();
                   // console.log("reject "+user.roles);
                    $location.url('/login');
                }
            });
        return defer.promise;
    }

    function checkAdmin($q, UserService, $location) {
        var defer = $q.defer();
        UserService
            .isAdmin()
            .then(function (user) {
                if(user != '0') {
                    defer.resolve(user);
                } else {
                    defer.reject();
                    $location.url("/home");
                }
            });
        return defer.promise;
    }
})();