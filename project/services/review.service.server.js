module.exports = function (app, reviewModel) {


    app.post("/api/user/:userId/recipe/:rid/review", submitReview);
    app.get("/api/admin/:adminId/pending/requests", findPendingCriticReviews);
    app.put("/api/admin/approve/review/:adminId", approveReview);
    app.delete("/api/admin/decline/review/:reviewId", declineReview);
    app.get("/api/review/list/:recipeId", findReviewsByRecipeId);
    app.get("/api/review/list/for/:userId", findReviewsByUserId);

    function submitReview(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        var recipeId = req.params.rid;

        var newReview = req.body;
        reviewModel
            .submitReview(newReview)
            .then(function (response){
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function findPendingCriticReviews(req, res) {
        var adminId = req.params.adminId;

        reviewModel
            .findPendingCriticReviews(adminId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function approveReview(req, res) {
        console.log("in app review");
        var adminId = req.params.adminId;
        var review = req.body;
        console.log(review);
        reviewModel
            .approveReview(review, adminId)
            .then(function () {
                console.log("updated");
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function declineReview(req, res) {
        var reviewId = req.params.reviewId;
        console.log("review in declin server"+ reviewId);
        reviewModel
            .declineReview(reviewId)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            })
    }

    function findReviewsByRecipeId(req, res) {
        var recipeId = req.params.recipeId;

        reviewModel
            .findReviewsByRecipeId(recipeId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            })
    }

    function findReviewsByUserId(req, res) {
        var userId = req.params.userId;

        reviewModel
            .findReviewsByUserId(userId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            })
    }
};