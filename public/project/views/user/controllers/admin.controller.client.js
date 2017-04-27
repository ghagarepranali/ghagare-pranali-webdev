(function () {
    angular
        .module("FoodAppMaker")
        .controller("AdminController", AdminController);

    function AdminController($http, ReviewService, adminUser, UserService, $location) {
        var vm = this;
        vm.adminUser = adminUser;
        vm.approveReview = approveReview;
        vm.declineReview = declineReview;
        vm.logout = logout;
        vm.deleteUser=deleteUser;
        vm.updateUsr = updateUsr;
        vm.setActiveTab = setActiveTab;

        function init() {
            //console.log(vm.adminUser);
           // console.log(vm.adminUser._id);

        }
        init();



        function updateUsr  (user) {

            var promise = UserService
                .updateUser(vm.adminUser._id, user);
            promise.success(function (user) {
                if (user == null) {
                    vm.error = "Unable to update the user";
                } else {
                    vm.message = "User is updated successfully";
                   // $location.url("/user/" + vm.userId);

                }
            })

        }
        function deleteUser () {
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(vm.adminUser._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }


        function setActiveTab(parameter) {
            if (parameter == "updateProfile") {
                vm.message="";
                vm.error="";
                vm.showUpdatePage = true;
                vm.showReviews = false;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = false;
                //  viewProfile();
            } else if (parameter == "showReviews") {
                vm.message="";
                vm.error="";
                vm.showUpdatePage = false;
                vm.showReviews = true;
                vm.showLikes = false;
                vm.showSearchUsers = false;
                vm.showFollowing = false;
                vm.showFollowers = false;
                displayReviews();

            }
        }
        function displayReviews() {
            ReviewService
                .findPendingCriticReviews(vm.adminUser._id)
                .success(displayPendingReviews);
        }
            function displayPendingReviews(response) {

                vm.pendingReviews = response;

        }

        function approveReview(review) {
            console.log("in app control "+ review);
            ReviewService
                .approveReview(review, vm.adminUser._id)
                .success(function () {
                     console.log("updated and calling pending");
                    ReviewService
                        .findPendingCriticReviews(vm.adminUser._id)
                        .success(function (response) {
                            vm.message = "Review is submitted successfully";
                            //  console.log("response is  "+response);
                            vm.pendingReviews = response;
                        }, function (err) {
                            vm.error = "Error in review submission. Try again later";
                        });
                })
        }
        
        function declineReview(review) {
            console.log("in decline control "+ review);
            ReviewService
                .declineReview(review._id)
                .success(function () {
                    ReviewService
                        .findPendingCriticReviews(vm.adminUser._id)
                        .success(function (response) {
                            vm.error = "Review is rejected successfully";
                            //  console.log("response is  "+response);
                            vm.pendingReviews = response;
                        }, function (err) {
                            vm.error = "Error in review submission. Try again later";
                        });
                })
        }


        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }


})();