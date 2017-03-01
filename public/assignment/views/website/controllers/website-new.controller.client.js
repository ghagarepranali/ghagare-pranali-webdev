(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites=websites;
                })
           /* vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);*/
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function (err) {
                    vm.message = "Error in creating website";
                });
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);

        };
    }
})();