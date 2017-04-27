module.exports = function () {

    // var mongoose = require('mongoose');

    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;

    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);


    var api = {
        "setModel": setModel,
        "submitReview": submitReview,
        "findPendingCriticReviews": findPendingCriticReviews,
        "approveReview": approveReview,
        "declineReview": declineReview,
        "findReviewsByRecipeId": findReviewsByRecipeId,
        "findReviewsByUserId": findReviewsByUserId
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function submitReview(reviewNew) {
        return model.userModel.findUserById(reviewNew.userId)
            .then(function (user) {
                if(user){
                    if(user.roles == "CRITIC"){
                        reviewNew.isCritic = true;
                    }
                    reviewNew.username = user.username;
                }
                return ReviewModel
                    .create(reviewNew);
            }, function (err) {
                return err;
            })

    }
    
    function findPendingCriticReviews(adminId) {
        return model.userModel.findUserById(adminId)
            .then(function (user) {
                if(user.roles == "ADMIN"){
                   return ReviewModel
                        .find({isCritic: false});
                }
            }, function (err) {
                return err;
            })
    }

    function approveReview(review, adminId) {
        return model.userModel
            .findUserById(adminId)
            .then(function (user) {
                if(user.roles=="ADMIN"){
                    return ReviewModel.update({userId:review.userId},{$set:{isCritic : true}}, { multi: true } )
                        .then(function (response) {
                             model.userModel.findUserById(review.userId)
                                .then(function (user) {
                                    user.roles="CRITIC";
                                    user.save();

                                });

                        });
                }
            });


    }

    function declineReview(reviewId) {
        return ReviewModel.findById(reviewId)
            .exec()
            .then(function (r) {
                //console.log("declining this r"+ r._id);
               return r.remove();
            }, function (err) {
                return err;
            })
    }

    function findReviewsByRecipeId(recipeId) {
        return ReviewModel.find({"recipeId": recipeId});
    }

    function findReviewsByUserId(userId) {
        return ReviewModel.find({"userId": userId});
    }
};