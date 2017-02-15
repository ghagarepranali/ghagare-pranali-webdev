(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetControlController", WidgetControlController);

function WidgetControlController($sce, $routeParams, WidgetService, $location) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.websiteId = $routeParams.wid;
    vm.pageId = $routeParams.pid;

    vm.widgetId = $routeParams.wgid;
    vm.getEditorTemplateUrl = getEditorTemplateUrl;


    function init() {
        if (typeof(vm.widgetId) === "undefined") {
            vm.widgetId = (new Date()).getTime();
        } else {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);

            vm.updateWid = function (widget) {
                var wid = WidgetService.updateWidget(vm.widgetId, widget);
                if (wid == null) {
                    vm.error = "unable to update user";
                } else {
                    vm.message = "user successfully updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }
            };

            function createWidget(widget) {
                WebsiteService.createWebsite(vm.userId, website);
                //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
                $location.url("/user/" + vm.userId + "/website");
            };
        }
    }
    init();

    function getEditorTemplateUrl(type) {
        return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
    }


    function createWidget (widget) {
        WidgetService.createWidget(vm.pageId, widget);
        //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
    };

    function getEditorWidgetUrl(type) {
        vm.widgetType = type;
        return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        //$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new");
    }


}
    })();