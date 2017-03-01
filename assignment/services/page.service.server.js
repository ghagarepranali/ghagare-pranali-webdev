module.exports = function (app){
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.json(page);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pgs = [];
        for(p in pages) {
            if (pages[p].websiteId == websiteId)
                pgs.push(pages[p]);

        }
        res.json(pgs);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id==pid;
        });
        res.json(page);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages){
            var pg = pages[p];
            if(pg._id == pageId){
                pages[p].description = page.description;
                pages[p].name = page.name;
                res.json(pg);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages.splice(p,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}