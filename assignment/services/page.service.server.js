module.exports = function (app, pageModel){
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findPageByWebsiteId(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        pageModel
            .findPageById(pid)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                if(response.ok ===1 && response.n === 1){
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }

            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel.deletePage(pageId)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.sendStatus(500);
            });
    }
};