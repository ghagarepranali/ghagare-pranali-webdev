module.exports = function () {
    console.log("in model");

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var q = require('q');
    mongoose.Promise = q.Promise;
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
        console.log(userId);
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
            {$set:updatedUser});/*{$set:{
         username: user.username,
         email: user.email,
         firstName: user.firstName,
         lastName: user.lastName,
         websites: user.websites
         }});*/
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