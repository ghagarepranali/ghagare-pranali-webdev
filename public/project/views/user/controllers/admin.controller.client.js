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

        function init() {
            //console.log(vm.adminUser);
           // console.log(vm.adminUser._id);
            ReviewService
                .findPendingCriticReviews(vm.adminUser._id)
                .success(displayPendingReviews);
        }
        init();
        
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
                            vm.message = "Review is rejected successfully";
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