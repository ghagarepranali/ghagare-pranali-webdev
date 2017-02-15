(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId=$routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
        vm.page = PageService.findPageById(vm.pageId);
    }
})();