(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $routeParams, $location) {
        var vm = this;
        vm.createUser = createUser;
        vm.register = register;

        function createUser(user){
            var user = UserService.createUser(user);
            $location.url("/user/"+user._id);
        }

        function register(user){
            UserService
                .findUserByUsername(user.username)
                .success(function(user){
                    vm.message = "The useranme is already taken";
                })
                .error(function (err) {
                    vm.message="available";
            });
        }
    }
})();