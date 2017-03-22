(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId=$routeParams.uid;
        vm.websiteId = $routeParams.wid;
        function init() {
            //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (page) {
                    vm.pages=page;
                });
            /*PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page=page;
                });*/
        }
        init();
    }
})();