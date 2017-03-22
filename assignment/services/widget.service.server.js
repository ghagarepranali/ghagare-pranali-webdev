module.exports = function (app, widgetModel){

    var multer = require('multer');
    var fs = require('fs');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget", updateWidgetPosition);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.delete("/api/widget/:widgetId", deleteWidget);


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findAllWidgets(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                err.sendStatus(404);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (response) {
                if(response.ok === 1 && response.n === 1){
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            })
            .catch(function (error) {
                res.sendStatus(500);
            });

    }
    function updateWidgetPosition(req, res) {
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        widgetModel
            .reorderWidget(pageId, initial_index, final_index)
            .then(function (response) {
                res.sendStatus(response);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;
        var width = req.body.width;
        var pageId = req.body.pid;


        var imgWidget = {
            width: width,
            _id: widgetId
        };

        if (myFile) {

            // Replace existing image.
            if (imgWidget.url) {
                fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
                });
            }


            imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            // Store off filename for easy retrieval during unlinking.
            imgWidget["fileName"] = myFile.filename;

            widgetModel
            .updateWidget(widgetId, imgWidget)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + pageId + "/widget");
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            })
    } else {
            // File was not uploaded
            // Return the user to widget list page
            res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pageId+"/widget");
        }


    }


};