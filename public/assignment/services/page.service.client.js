(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService() {
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
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId){
            var pgs = [];
            for(p in pages) {
                if (pages[p].websiteId == websiteId)
                    pgs.push(pages[p]);
            }
                return pgs;
        }

        function findPageById(pageId){
            for(p in pages){
                if(pages[p]._id === pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(p in pages){
                if(pages[p]._id == pageId){
                    pages.splice(p,1);
                }
            }
        }

        function updatePage(pageId, page) {
            for(p in pages){
                var pg = pages[p];
                if(pg._id === pageId){
                    pages[p].name = page.name;
                    pages[p].description=page.description;
                    return pg;
                }
            }
            return null;
        }

    }
})();