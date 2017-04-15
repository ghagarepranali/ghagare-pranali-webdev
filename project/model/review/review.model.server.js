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
        "findReviewsByRecipeId": findReviewsByRecipeId
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

    function approveReview(review) {
       /* console.log("in review model");
        return ReviewModel.update({_id: review._id}, {$set: {isCritic: true}})
            .exec()
            .then(function () {*/
               return  model.userModel.findUserById(review.userId)
                    .then(function (user) {
                        user.roles = 'CRITIC';
                        user.save();
                      /*  console.log("user is found "+ user);
                             model.userModel.updateRoleToCritic(user).exec();
                       */
                      return ReviewModel.find({userId: user._id})
                       .exec()
                       .then(function () {

                       return ReviewModel.update({userId: user._id}, {$set: {isCritic: true}}, {multi: true})
                           .exec()
                           .then(function () {
                               return model.userModel.update({_id: user._id}, {$set: {reviewed: review._id}});
                           })

                       })


                    }, function (err) {
                        
                    });
        /*   }, function (err) {
                return err;
            })*/
    }

    function declineReview(reviewId) {
        return ReviewModel.findById(reviewId)
            .exec()
            .then(function (r) {
                console.log("declining this r"+ r._id);
               return r.remove();
            }, function (err) {
                return err;
            })
    }

    function findReviewsByRecipeId(recipeId) {
        return ReviewModel.find({"recipeId": recipeId});
    }
};