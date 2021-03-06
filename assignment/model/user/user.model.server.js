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
        "setModel":setModel
    };
    return api;


    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({"username": username, "password": password});
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

    function setModel(_model) {
        model = _model;
    }
};