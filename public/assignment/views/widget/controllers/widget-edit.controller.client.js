(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget =  updateWidget;
        vm.createWidget = createWidget;

        function init() {
           WidgetService
                .findWidgetById(vm.widgetId)
                .success(renderWidgets);
        }
        init();

        function renderWidgets(widget) {
            vm.widget=widget;
        }

        function updateWidget(widget) {
             WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function (wid) {
                    if(wid == null){
                        vm.error = "unable to update user";
                    } else{
                        vm.message = "user successfully updated";
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                });

        }


        function createWidget(widget){
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (wid) {
                    if(wid == null){
                        vm.error = "unable to update user";
                    } else{
                        vm.message = "user successfully updated";
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                });

        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
               })
                .error(function () {
                    vm.error = 'unable to remove widget';
                });

        };
    }
})();