(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {


        var api = {
            "findAllWidgets": findAllWidgets,
            "findWidgetById" : findWidgetById,
            "updateWidget": updateWidget,
            "createWidget":createWidget,
            "deleteWidget":deleteWidget,
            "UpdateWidgetPosition": UpdateWidgetPosition
    };
        return api;

        function findAllWidgets(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");

        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);

        }

        function updateWidget(widgetId, widget){
            return $http.put("/api/widget/"+widgetId, widget);

        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget", widget);

        }

        function deleteWidget(wid){
            return $http.delete("/api/widget/"+wid);

        }
        
        function UpdateWidgetPosition(startIndex, finalIndex, pageId) {
            return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + finalIndex);
        }
    }
})();