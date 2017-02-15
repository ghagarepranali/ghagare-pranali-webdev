(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $routeParams, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user){
            var user = UserService.createUser(user);
            $location.url("/user/"+user._id);
        }
    }
})();