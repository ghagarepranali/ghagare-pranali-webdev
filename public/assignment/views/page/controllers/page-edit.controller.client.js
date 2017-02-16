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
        vm.updatePg = updatePg;

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

       function updatePg(pgDetails){
            var pg = PageService.updatePage(vm.pageId, pgDetails);
            if(pg == null){
                vm.error = "unable to update the page";
            } else{
                vm.message="page is updated successfully";
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
        };


        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

    }
})();