(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
        ];
        var api = {
            "createWebsite": createWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
        }

        function findAllWebsitesForUser(uid) {
            var sites = [];
            for(w in websites){
                if(websites[w].developerId == uid)
                    sites.push(websites[w]);
            }
            return sites;
        }

        function findWebsiteById(wid) {
            for(var w in websites){
                if(websites[w]._id  == wid){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function deleteWebsite(wid){
            for(var w in websites){
                if(websites[w]._id == wid){
                    websites.splice(w,1);
                }
            }
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites){
                var web = websites[w];
                if(web._id === websiteId){
                    websites[w].description = website.description;
                    websites[w].name = website.name;
                    return web;
                }
            }
            return null;
        }


    }
})();