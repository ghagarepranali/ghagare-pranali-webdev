(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWeb = updateWeb;


        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWeb(webDetails) {
            var web = WebsiteService.updateWebsite(vm.websiteId, webDetails);
            if(web == null){
                vm.error = "unable to update user";
            } else{
                vm.message = "user successfully updated";
                $location.url("/user/"+vm.userId+"/website");
            }
        };

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };
        

    }
})();