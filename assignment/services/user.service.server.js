module.exports = function (app, userModel) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);



    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            websites: user.websites
        };
        userModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
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
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (users) {
                if (users.length != 0) {
                    res.json(users[0]);
                } else {
                    res.sendStatus(500);
                }
            }, function (err) {
                res.sendStatus(500).send(err);

            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user.length != 0) {
                    res.json(user[0]);
                } else {
                    res.sendStatus(500);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(function (response) {
                if (response.nModified == 1) {
                    userModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })
                } else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }
};