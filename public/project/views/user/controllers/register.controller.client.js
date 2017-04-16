(function () {
    angular
        .module("FoodAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $routeParams, $location) {
        var vm = this;
        vm.register = register;




        function register(user) {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.message = "The username is already taken";
                    })
                    .error(function (err) {
                        UserService
                            .createUser(user)
                            .success(function (user) {
                                var user = user;
                                $location.url("/user/" + user._id);
                            }, function (error) {
                                vm.error = "Unable to register user due to an error:"
                            });
                    });
            }

    }
})();