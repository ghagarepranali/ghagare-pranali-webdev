module.exports = function (app){

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



    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id = ((new Date()).getTime()).toString();
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgets(req, res) {
        var pageId = req.params.pageId;
        var widget = [];
        for(var w in widgets) {
            if (widgets[w].pageId == pageId)
                widget.push(widgets[w]);
        }
        res.json(widget);
    }

    function findWidgetById(req, res) {
        var wid = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id==wid;
        });
        res.json(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                if(widgets[w].widgetType == "HEADER" || widgets[w].widgetType == "HTML"){
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;

                } else if(widgets[w].widgetType == "IMAGE" || widgets[w].widgetType == "YOUTUBE"){
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;

                }
                res.json(widgets[w]);
                return;
            }

        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }
    function updateWidgetPosition(req, res) {
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        var allWidgetsForPage = widgets.filter(function (w) {
            return w.pageId == pageId;
        });

        widgets = widgets.filter(function (w) {
            return allWidgetsForPage.indexOf(w) < 0;
        });

        var elem_at_initial_pos = allWidgetsForPage[initial_index];
        allWidgetsForPage.splice(initial_index, 1);
        allWidgetsForPage.splice(final_index, 0, elem_at_initial_pos);

        widgets = widgets.concat(allWidgetsForPage);
        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;

        imgWidget = widgets.find(function (i) {
            return i._id == widgetId;
        });

        // Replace existing image.
        if (imgWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
            });
        }

        imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        // Store off filename for easy retrieval during unlinking.
        imgWidget["fileName"] = myFile.filename;

        res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imgWidget.pageId + "/widget");
    }


};