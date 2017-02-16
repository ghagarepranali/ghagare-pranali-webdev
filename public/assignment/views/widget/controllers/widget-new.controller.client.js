(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createHeaderWidget = createHeaderWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createYouTubeWidget = createYouTubeWidget;
        vm.createImageWidget = createImageWidget;
        vm.createHTMLWidget = createHTMLWidget;
/*
        function init() {
            //vm.widget = WidgetService.findWidgetById(vm.widgetId);


        }
        init();*/

        function createHeaderWidget() {
            var widget = { "_id": "100", "widgetType": "HEADER", "pageId": "", "size": 2, "text": "Text"};
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);

        }
        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        function createYouTubeWidget() {
            var widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL"};
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id);
        }

        function createImageWidget() {
            var widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "URL"};
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id);
        }

        function createHTMLWidget() {
            var widget = { "_id": "", "widgetType": "HTML", "pageId": "", "text": "<p>Lorem ipsum</p>"};
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id);
        }
       /* function createWidget (widget) {
            WidgetService.createWidget(vm.pageId, widget);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        };
*/

    }
})();