(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,UserService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        var user = UserService.findUserById(vm.userId);
        vm.user = user;
        vm.deleteUser=deleteUser;

        vm.updateUsr = function (user) {
            var pg = UserService.updateUser(vm.userId, user);
            if (pg == null) {
                vm.error = "unable to update the page";
            } else {
                vm.message = "page is updated successfully";
                $location.url("/user/" + vm.userId);

            }
        };

        function deleteUser () {
            UserService.deleteUser(vm.userId);
            $location.url("/login");
        };

    }
})();