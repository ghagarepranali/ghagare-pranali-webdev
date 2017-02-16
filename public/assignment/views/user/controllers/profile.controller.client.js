(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,UserService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.deleteUser=deleteUser;
        vm.updateUsr = updateUsr;


        function init() {
            var user = UserService.findUserById(vm.userId);
            vm.user = user;
        }
        init();

        function updateUsr  (user) {
            var usr = UserService.updateUser(vm.userId, user);
            if (usr == null) {
                vm.error = "Unable to update the user";
            } else {
                vm.message = "User is updated successfully";
                $location.url("/user/" + vm.userId);

            }
        };
        function deleteUser () {
            UserService.deleteUser(vm.userId);
            $location.url("/login");
        };

    }
})();