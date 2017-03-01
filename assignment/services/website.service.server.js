module.exports = function (app){
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];
    
    function findAllWebsitesForUser(req, res) {
        var userId= req.params.userId;
        var sites = [];
        for(w in websites){
            if(websites[w].developerId == userId)
                sites.push(websites[w]);
        }
        res.json(sites);
    }

    function createWebsite(req, res) {
        var website = req.body;
        var userId= req.params.userId;
        website.developerId = userId;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.json(website);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == wid;
        });
        res.json(website);
    }

    function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
        for(var w in websites){
            var web = websites[w];
            if(web._id == websiteId){
                websites[w].description = website.description;
                websites[w].name = website.name;
                res.json(web);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};
