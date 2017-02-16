(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

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


        this.findAllWidgets = findAllWidgets;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.createWidget = createWidget;
        this.deleteWidget = deleteWidget;

        function findAllWidgets(pageId) {
            return widgets;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    if(widgets[w].widgetType == "HEADER" || widgets[w].widgetType == "HTML"){
                        widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                        return widgets[w];
                    } else if(widgets[w].widgetType == "IMAGE" || widgets[w].widgetType == "YOUTUBE"){
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                        return widgets[w];
                    }
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = ((new Date()).getTime()).toString();
            widgets.push(widget);
            return angular.copy(widget);
        }

        function deleteWidget(wid){
            for(var w in widgets){
                if(widgets[w]._id == wid){
                    widgets.splice(w,1);
                }
            }
        }
    }
})();