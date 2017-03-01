(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService($http) {
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
            return $http.post("/api/user/"+userId+"/website", website);

        }

        function findAllWebsitesForUser(uid) {
            return $http.get("/api/user/"+uid+"/website");

        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);

        }

        function deleteWebsite(wid){
            return $http.delete("/api/website/"+wid);

        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/" + websiteId, website);

        }
    }
})();