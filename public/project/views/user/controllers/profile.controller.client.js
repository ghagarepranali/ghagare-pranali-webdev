(function () {
    angular
        .module("FoodAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, currentUser, RecipeService, ReviewService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.currentUser = currentUser;
        vm.deleteUser=deleteUser;
        vm.updateUsr = updateUsr;
        vm.followUser = followUser;
        vm.searchFood = searchFood;
        vm.searchUser = searchUser;
        vm.setActiveTab = setActiveTab;
        vm.displayLikes = displayLikes;
        vm.displayFollowers =displayFollowers;
        vm.logout = logout;
        vm.viewProfile =viewProfile;
        vm.unfollowUser = unfollowUser;
        vm.displayReviews = displayReviews;
        vm.displayFollowing = displayFollowing;

       // vm.otherProfile=false;

        //vm.displayLikes = displayLikes;

      //  vm.findAllUsers = findAllUsers;


        function init() {
            //vm.showUpdatePage = false;
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                });
            /* var promise = UserService.findUserById(vm.userId);
             promise.success(function(user){
             vm.user = user;
             });
             */
            UserService.findAllUsers()
                .success(function (response) {
                    vm.users = response;
                });
          //  displayFollowers();
           // displayFollowing();

           /* UserService.displayReviews(vm.userId)
                .success(function (response) {
                    vm.reviews = response;
                });
*/
console.log("initial value "+ vm.otherProfile);
        }
        init();
      /*  function renderUser(user) {
            vm.user = user;

        }*/

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

        }
        function deleteUser () {
            var answer = confirm("Are you sure?");
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
        }

       /* function findAllUsers() {

        }*/
        function followUser(fwUserId) {
            UserService
                .findUserById(fwUserId)
                .success(function (fwUser) {
                    var promise = UserService
                        .followUser(vm.userId, fwUser);
                    promise.success(function () {

                    })
                });

        }

        function unfollowUser(unFwUser) {
            UserService
                .unfollowUser(vm.userId, unFwUser)
                .success(function () {
                    vm.message = "Successfully unfollowed";
                })
        }

        function searchFood(food) {
            vm.food = food;
            $location.url("/user/"+vm.userId+"/search/"+ vm.food);
        }

        function searchUser(userQuery) {
           // console.log("in search query"+ userQuery);
            UserService
                .searchUser(userQuery)
                .success(function (response) {
                  //  console.log("in search"+ response);
                    vm.userSearchResults = response;
                });

        }

        function setActiveTab(parameter) {
            if(parameter == "updateProfile"){
                vm.message="";
                vm.error="";
                vm.showUpdatePage = true;
                vm.showReviews = false;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = false;
              //  viewProfile();
            } else if(parameter == "showReviews"){
                vm.message="";
                vm.error="";
                vm.showUpdatePage = false;
                vm.showReviews = true;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = false;
                displayReviews();

            } else if(parameter == "showLikes"){
                vm.message="";
                vm.error="";
                vm.showUpdatePage = false;
                vm.showReviews = false;
                vm.showLikes = true;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = false;
                displayLikes();
            } else if(parameter == "showSearchUsers"){
                vm.message="";
                vm.error="";
                vm.showUpdatePage = false;
                vm.showReviews = false;
                vm.showLikes = false;
                vm.showSearchUsers = true;
                vm.showFollowing = false;
                vm.showFollowers = false;
                vm.userSearchResults="";
            } else if(parameter == "showFollowing"){
                vm.message="";
                vm.error="";
                vm.showUpdatePage = false;
                vm.showReviews = false;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = true;
                vm.showFollowers = false;
                displayFollowing();
            } else if(parameter == "showFollowers"){
                vm.message="";
                vm.error="";
                vm.showUpdatePage = false;
                vm.showReviews = false;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = true;
                displayFollowers();
            } else {
                vm.message="";
                vm.error="";
                vm.showUpdatePage = true;
                vm.showReviews = false;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = false;
            }

        }

        function displayFollowers() {
            vm.listOfFollowers = [];
          //  for(var i=0; i<vm.user.followers; i++){
            for(var i in vm.user.followers){
                UserService
                    .findUserById(vm.user.followers[i])
                    .then(function (user) {
                       // console.log("the user is "+ user);
                        vm.listOfFollowers.push(user.data);

                    })
            }

            init();
        }


        function displayFollowing() {
            vm.listOfFollowing = [];
            //for(var i=0; i<vm.user.following; i++){
            for(var i in vm.user.following){
                UserService
                    .findUserById(vm.user.following[i])
                    .then(function (user) {
                        vm.listOfFollowing.push(user.data);

                    })
            }
            init();
        }
       // var temp=[];

        function displayLikes() {
           // console.log("in display");
            vm.likesForUser = [];
           // console.log("the user is "+ vm.user.likes);
            for(var i in vm.user.likes) {
                RecipeService.findRecipe(vm.user.likes[i])
                    .then(function (response) {
                        var recipe = response.data;
                       // console.log("the rec is found "+ recipe);
                        RecipeService.findRecipeById(recipe.id)
                            .then(function (response) {
                                vm.likesForUser.push(response.data);

                            })
                    });
              /*  RecipeService.findRecipe(vm.user.likes[i])
                    .then(function (recipe) {
                        console.log("the recipe found is "+ recipe);
                        RecipeService.findRecipeById(recipe._id)
                            .then(function (response) {
                                vm.likesForUser.push(response);
                            })
                    });*/

                
            }

           // console.log("the likes of users are :"+vm.likesForUser);
        }
        
        
        function displayReviews() {
            vm.listOfReviewsForUser = [];
            ReviewService
                .findReviewsByUserId(vm.userId)
                .then(function (response) {
                    vm.listOfReviewsForUser = response.data;
                });
            //for(var i=0; i<vm.user.following; i++){
           /* for(var i in vm.user.following){
                UserService
                    .findUserById(vm.user.following[i])
                    .then(function (user) {
                        vm.listOfFollowing.push(user.data);

                    })
            }*/
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function viewProfile() {
            if(currentUser._id != vm.user._id){
                vm.otherProfile = true;
            }
            //console.log("the value is "+ vm.otherProfile);
        }

    }
})();