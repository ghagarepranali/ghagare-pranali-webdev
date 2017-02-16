(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",   email: "alice@heroku.com",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",     email: "bob@heroku.com",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",  email: "charly@heroku.com",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi",email: "jannunzi@heroku.com", firstName: "Jose",   lastName: "Annunzi" }
        ];
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
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }
        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function createUser(user){
            user._id = (new Date()).getTime().toString();
            //user.username = user;
            users.push(user);
            return user;
        }

        function updateUser(userId, user){
            for(var u in users){

                if(users[u]._id == userId){
                    users[u].username = user.username;
                    users[u].password = user.password;
                    users[u].firstName=user.firstName;
                    users[u].lastName=user.lastName;
                    users[u].email = user.email;
                    return users[u];
                }

            }
            return null;
        }

        function deleteUser(userId) {
            for(u in users){
                if(users[u]._id == userId){
                    users.splice(u,1);
                }
            }
        }
    }
})();