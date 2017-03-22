module.exports = function () {
    var model=null;
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var q = require('q');
    mongoose.Promise = q.Promise;

    var api = {
        "createWebsiteForUser"      : createWebsiteForUser,
        "findAllWebsitesForUser"    : findAllWebsitesForUser,
        "findWebsiteById"           : findWebsiteById,
        "updateWebsite"             : updateWebsite,
        "deleteWebsite"             : deleteWebsite,
        "setModel"                  : setModel
    };

    return api;



    function createWebsiteForUser(userId, website) {
       /* return WebsiteModel.create(website)
            .then(function (newWebsite) {
                return WebsiteModel.findByIdAndUpdate(newWebsite._id, {_user: userId}, {new: true}).exec();
            })*/
        return WebsiteModel
            .create(website)
            .then(
                function(website){
                    return model.userModel
                        .findUserById(userId)
                        .then(function (user) {
                            website._user = user._id;
                            console.log(user._id);
                            user.websites.push(website._id);
                            website.save();
                            user.save();
                            return website;
                        },function (err) {
                            return err;
                        })
                },
                function(err){
                    return err;
                });
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId});
    }
    
    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({_id: websiteId},{$set:website});
    }
    
    function deleteWebsite(websiteId) {
        return WebsiteModel.findById(websiteId)
            .exec()
            .then(function (website) {
                return website.remove();
            });
    }

    function setModel(_model) {
        model = _model;
    }


};