(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        function init() {
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites=websites;
                })

             WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(renderWebsite);
        }
        init();

        function renderWebsite(website) {
            vm.website = website;
        }
        function updateWebsite(webDetails) {
            WebsiteService
                .updateWebsite(vm.websiteId, webDetails)
                .success(function (web) {
                    if(web){
                        vm.message = "website successfully updated";
                        $location.url("/user/"+vm.userId+"/website");

                    } else{
                        vm.error = "unable to update website";
                    }
                });

        };

        function deleteWebsite () {
            var answer = confirm("Are you sure?");
            if(answer) {
                WebsiteService
                    .deleteWebsite(vm.websiteId)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {
                        vm.error = 'unable to remove website';
                    });

            }
        };
        

    }
})();