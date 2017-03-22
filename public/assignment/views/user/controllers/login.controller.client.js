(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
            .success(function (response) {
                var user = response;
                if(user) {
                    $location.url("/user/" + user._id);
                }})
                .error(function (error) {
                    vm.error = "User not found";
                });
            /*promise.success(function(user) {
               if(user) {
                   $location.url("/user/"+user._id);
               } else {
                   vm.error = "User not found";
               }
           });*/

        }
    }
})();