(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId=$routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.createPage = createPage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {
            PageService.createPage(vm.websiteId, page);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();