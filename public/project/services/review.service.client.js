(function () {
    angular
        .module("FoodAppMaker")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            "submitReview": submitReview,
            "findPendingCriticReviews": findPendingCriticReviews,
            "approveReview": approveReview,
            "declineReview": declineReview
        };

        return api;

        function submitReview(userId, rid, review) {
            console.log("in client");
            console.log(review);
            return $http.post("/api/user/"+userId+"/recipe/"+rid+"/review", review);
        }
        
       function findPendingCriticReviews(adminId) {
            return $http.get("/api/admin/"+adminId+"/pending/requests");
        }

        function approveReview(review) {
            console.log("in app service");
            return $http.put("/api/admin/approve/review", review);
        }

        function declineReview(reviewId) {
            console.log("in delete service"+ reviewId);
            return $http.delete("/api/admin/decline/review/"+ reviewId);
        }

    }
})();