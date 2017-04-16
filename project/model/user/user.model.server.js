module.exports = function () {

    // var mongoose = require('mongoose');

    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api={
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserByUsername":findUserByUsername,
        "findUserByCredentials":findUserByCredentials,
        "updateUser": updateUser,
        "deleteUser": deleteUser,
        "setModel":setModel,
        "findAllUsers": findAllUsers,
        "followUser": followUser,
        "addRecipeToUser": addRecipeToUser,
        "searchUser":searchUser,
        "unfollowUser": unfollowUser,
        "findUserByFacebookId": findUserByFacebookId
    };
    return api;


    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({"username": username, "password": password});
    }

    function findUserByUsername(username) {
        return UserModel.find({"username": username});
    }

    function updateUser(userId, updatedUser) {
        return UserModel.update({_id: userId},
            {$set:updatedUser});
    }

    function deleteUser(userId) {
        return UserModel.findById(userId)
            .exec()
            .then(function (user) {
                return user.remove();
            });

    }

    function findAllUsers() {
        return UserModel.find();
    }

    function followUser(userId, fwUser) {
        return UserModel.update({_id: userId}, {$addToSet: {following: fwUser}})
            .exec()
            .then(function () {
                UserModel.update({_id: fwUser._id}, {$addToSet: {followers: userId}})
                    .exec();
            });
    }

    function addRecipeToUser(userId, recipe) {
        console.log("here");
        return UserModel.findUserById(userId)
            .then(function (user) {
                user.likes.push(recipe._id);
                user.save();
            });
        //return UserModel.update({_id: user._id}, {$addToSet: {likes: recipe._id}});

    }

    function setModel(_model) {
        model = _model;
    }

function searchUser(searchQuery) {
    return UserModel.find({$and:[{"username":{'$regex' : '^'+searchQuery, '$options' : 'i'}}, {"roles" : {$nin: ['ADMIN']}}]})
}

function unfollowUser(userId, unFwUser) {
    return UserModel
        .findById(userId)
        .then(function (user1) {
            user1.following.splice(user1.following.indexOf(unFwUser._id), 1);
            user1.save();
            UserModel
                .findById(unFwUser._id)
                .then(function (user2) {
                    user2.followers.splice(user2.followers.indexOf(userId), 1);
                    user2.save();
                });
        });
}
    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId})
            .exec()
            .then(function (user) {
                return user;
            });
    }

};