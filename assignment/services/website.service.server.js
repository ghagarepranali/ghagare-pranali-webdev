module.exports = function (app, websiteModel){
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    

    function createWebsite(req, res) {
        var website = req.body;
        var userId= req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var userId= req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }


    function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (response) {
            if(response.ok === 1 && response.n ===1){

                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }

        }, function (err) {
            res.sendStatus(404);
        });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                res.json(website);
            })
            .catch(function (error) {
                res.sendStatus(500);
            });
    }
};
