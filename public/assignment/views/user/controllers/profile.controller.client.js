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
            UserService
                .findUserById(vm.userId)
                .success(renderUser);
           /* var promise = UserService.findUserById(vm.userId);
            promise.success(function(user){
                vm.user = user;
            });
*/
        }
        init();
        function renderUser(user) {
            vm.user = user;
        }

        function updateUsr  (user) {
            var promise = UserService
                .updateUser(vm.userId, user);
            promise.success(function (user) {
                if (user == null) {
                    vm.error = "Unable to update the user";
                } else {
                    vm.message = "User is updated successfully";
                    $location.url("/user/" + vm.userId);

                }
            })

        };
        function deleteUser () {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(vm.userId)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }

          /*  var promise = UserService.deleteUser(vm.userId);
            promise.success(function () {
                $location.url("/login");
            })*/

        };

    }
})();