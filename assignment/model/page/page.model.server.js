module.exports = function () {
    var model=null;
    var mongoose = require("mongoose");
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);
    var q = require("q");
    mongoose.Promise = q.Promise;

    var api = {
        "createPage"            :createPage,
        "findPageByWebsiteId"   :findPageByWebsiteId,
        "findPageById"          :findPageById,
        "updatePage"            :updatePage,
        "deletePage"            :deletePage,
        "setModel"              :setModel
    };
    return api;

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function (page) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page);
                        page._website = website._id;
                        website.save();
                        page.save();
                        return page;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function findPageByWebsiteId(websiteId) {
        return PageModel.find({_website: websiteId});
    }
    
    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }
    
    function updatePage(pageId, page) {
        return PageModel.update({_id: pageId}, {$set: page});
    }
    
    function deletePage(pageId) {
        return PageModel.findById(pageId)
            .exec()
            .then(function (page) {
                return page.remove();
            });
    }

    function setModel(_model) {
        model = _model;
    }

};