(function () {
    angular
        .module("FoodAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {

            UserService.login(user)
                .then(function (user) {
                    if (user) {
                        //console.log("login control");
                        //console.log(user._id);
                        $location.url("/user/"+user._id);
                    }
                }, function (err) {
                        vm.error = "User not found or incorrect password";

                });


            /*
             UserService.findUserByCredentials(user.username, user.password)
             .success(function (response) {
             var user = response;
             if(user) {
             $location.url("/user/" + user._id);
             }})
             .error(function (error) {
             vm.error = "User not found";
             });*/
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