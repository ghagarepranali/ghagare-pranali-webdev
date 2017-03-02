(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService($http) {

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