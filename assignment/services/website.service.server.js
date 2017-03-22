module.exports = function (app, websiteModel){
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    

    function createWebsite(req, res) {
        var website = req.body;
        var userId= req.params.userId;
        console.log(userId);
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(404);
            });

       /* website.developerId = userId;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.json(website);*/
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
                console.log("website id found");
            }, function (err) {
                res.sendStatus(404);
            });

       /* var website = websites.find(function (w) {
            return w._id == wid;
        });
        res.json(website);*/
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

        /*var sites = [];
        for(w in websites){
            if(websites[w].developerId == userId)
                sites.push(websites[w]);
        }
        res.json(sites);*/
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

        /*for(var w in websites){
            var web = websites[w];
            if(web._id == websiteId){
                websites[w].description = website.description;
                websites[w].name = website.name;
                res.json(web);
                return;
            }
        }*/
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

       /* for(var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }
};
