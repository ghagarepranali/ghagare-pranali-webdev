(function () {
    angular
        .module("FoodAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById":findUserById,
            "findUserByUsername":findUserByUsername,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findAllUsers": findAllUsers,
            "followUser": followUser,
            "loggedin": loggedin,
            "login": login,
            "isAdmin": isAdmin,
            "logout": logout,
            "searchUser":searchUser
         };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }
        function findUserById(uid) {
            return $http.get("/api/user/"+uid);

        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);

        }

        function createUser(user){
            return $http.post("/api/user", user);

        }

        function updateUser(userId, user){
            return $http.put("/api/user/"+userId, user);

        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);

        }

        function findAllUsers() {
            return $http.get("/api/users");
        }

        function followUser(userId, fwUser) {
            return $http.put("/api/user/follow/"+userId, fwUser);
        }

        function loggedin() {
            return $http.post("/api/user/loggedin")
                .then(function (response) {
                    return response.data;
                });
        }

        function login(user) {
            return $http.post("/api/user/login", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function isAdmin() {
            return $http.post("/api/user/isAdmin")
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post("/api/user/logout")
                .then(function (response) {
                    return response.data;
                });
        }

        function searchUser(userQuery) {
            console.log(userQuery);
            return $http.get("/api/search/user/"+userQuery);
        }

       /* function displayReviews(userId) {
            return $http.get("/api/display/reviews/"+userId);
        }*/


    }
})();