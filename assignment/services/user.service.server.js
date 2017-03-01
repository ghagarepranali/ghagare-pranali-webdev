module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            email: "alice@heroku.com",
            firstName: "Alice",
            lastName: "Wonder"
        },
        {_id: "234", username: "bob", password: "bob", email: "bob@heroku.com", firstName: "Bob", lastName: "Marley"},
        {
            _id: "345",
            username: "charly",
            password: "charly",
            email: "charly@heroku.com",
            firstName: "Charly",
            lastName: "Garcia"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            email: "jannunzi@heroku.com",
            firstName: "Jose",
            lastName: "Annunzi"
        }
    ];

    
    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime().toString();
        //user.username = user;
        users.push(user);
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }

    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var user = users.find(function (user) {
            return user.password == password &&
                user.username == username;
        });
        res.json(user);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        for (var u in users) {
            if (users[u]._id == userId) {
                users[u].username = user.username;
                users[u].password = user.password;
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].email = user.email;
                res.json(users[u]);
                return;
            }

        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var u in users) {
            if (users[u]._id == userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}