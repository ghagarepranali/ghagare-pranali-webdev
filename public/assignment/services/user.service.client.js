(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById":findUserById,
            "findUserByUsername":findUserByUsername,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
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
    }
})();