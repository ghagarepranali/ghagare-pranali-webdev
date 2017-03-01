(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm=this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.deletePage=deletePage;
        vm.updatePage = updatePage;

        function init(){
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (page) {
                    vm.pages=page;
                });
            PageService
                .findPageById(vm.pageId)
                .success(renderPage);
           // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        }
        init();
        function renderPage(page) {
            vm.page = page;
        }

       function updatePage(pgDetails){
           PageService
                .updatePage(vm.pageId, pgDetails)
                .success(function (pg) {
                    if(pg){
                        vm.message="page is updated successfully";
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

                    } else{
                        vm.error = "unable to update the page";
                    }
                });
        };


        function deletePage () {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error = 'unable to remove website';
                });

        };

    }
})();