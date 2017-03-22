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
        vm.createTextWidget = createTextWidget;


        function createHeaderWidget() {
            var widget = { "widgetType": "HEADER", "pageId": "", "size": 2, "text": ""};
            WidgetService.createWidget(vm.pageId, widget).success(function (response) {
                vm.widget=response;
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
            });


        }
        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        function createYouTubeWidget() {
            var widget = {"widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": ""};
            WidgetService.createWidget(vm.pageId, widget)
                .success(function (response) {
                    vm.widget=response;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id);
                });

        }

        function createImageWidget() {
            var widget = { "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": ""};
             WidgetService.createWidget(vm.pageId, widget)
                .success(function (response) {
                    vm.widget=response;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id);
                });

        }

        function createHTMLWidget() {
            var widget = { "widgetType": "HTML", "pageId": "", "text": ""};
            WidgetService.createWidget(vm.pageId, widget)
                .success(function (response) {
                    vm.widget=response;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id)
                });

        }

        function createTextWidget() {
            var widget = { "widgetType": "TEXT", "pageId": "", "text": ""};
            WidgetService.createWidget(vm.pageId, widget)
                .success(function (response) {
                    vm.widget=response;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ vm.widget._id)
                });
        }


    }
})();