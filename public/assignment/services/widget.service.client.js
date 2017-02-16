(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "All-time UEFA Champions League standings"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "The 25th UEFA Champions League season is well under way so where does your team rank in the all-time standings? How many of the top ten can you name?"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/41/90/49/2419049_w1.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text":
            '<p>Real Madrid were the most successful team in the European Cup and having won the title five times more since 1993 the holders also lead the way in the UEFA Champions League era – but not by much. After nearly 25 year and over 220 games apiece, just five points separate the Merengues and their great rivals Barcelona in the sunofficial all-time standings. That difference could be overhauled before this seasons semi-finals! Bayer.<br></p>'},
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