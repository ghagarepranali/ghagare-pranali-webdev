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
            PageService
                .findPageById(vm.pageId)
                .success(renderPage);
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (page) {
                    vm.pages=page;
                });
        }
        init();

        function createPage (page) {
            PageService
                .createPage(vm.websiteId, page)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function (err) {
                    vm.message = "error creating page";
                });
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);

        };
        function renderPage(page) {
            vm.page=page;
        }
    }
})();