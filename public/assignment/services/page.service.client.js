(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService($http) {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page", page);

        }

        function findPageByWebsiteId(websiteId){
            return $http.get("/api/website/"+websiteId+"/page");

        }

        function findPageById(pageId){
            return $http.get("/api/page/"+pageId);

        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);

        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId, page);

        }

    }
})();