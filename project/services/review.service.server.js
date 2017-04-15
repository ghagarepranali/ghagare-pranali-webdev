module.exports = function (app, reviewModel) {


    app.post("/api/user/:userId/recipe/:rid/review", submitReview);
    app.get("/api/admin/:adminId/pending/requests", findPendingCriticReviews);
    app.put("/api/admin/approve/review", approveReview);
    app.delete("/api/admin/decline/review/:reviewId", declineReview);

    function submitReview(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        var recipeId = req.params.rid;

        var newReview = req.body;
        console.log(newReview);
        //var recipe = req.body.recipe;
        //console.log(req.body);
console.log("in service");
        reviewModel
            .submitReview(newReview)
            .then(function (response){
                console.log(response);
            }, function (err) {

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
        var review = req.body;
        console.log(review);
        reviewModel
            .approveReview(review)
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
};