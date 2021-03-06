module.exports = function (app, userModel) {

    var bcrypt = require('bcrypt-nodejs');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;


    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID, //1146628545447156,//
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET, //"d5c0230a8cab3cf017834b449af401a9",// //
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,//"http://localhost:3000/auth/facebook/callback",////,
        profileFields: ['id', 'name', 'emails']
    };


    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/users", findAllUsers);
    app.put("/api/user/follow/:userId", followUser);
    app.post("/api/user/login", passport.authenticate('local'), login);
    app.post("/api/user/loggedin", loggedin);
    app.post('/api/user/isAdmin', isAdmin);
    app.post("/api/user/logout", logout);
    app.get("/api/search/user/:userQuery", searchUser);
    app.put("/api/user/unfollow/:userId", unfollowUser);

    app.get("/auth/facebook", passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
            failureRedirect: '/project/#/login'
        }),
        function (req, res) {
            var redirectUrl = "/project/index.html#/user/" + req.user._id.toString();
            res.redirect(redirectUrl);
        });

    //app.get("/api/display/reviews/:userId", displayReviews);


    function localStrategy(username, password, done) {
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        if (bcrypt.compareSync(password, user[0].password)) {
                            return done(null, user[0]);
                        }
                        else {
                            return done(null, false, {message: "Incorrect password."});
                        }
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                });
      /*  userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log('[0]');
                    console.log(user);
                    if (!user) {
                        console.log('[1]');
                        return done(null, false);
                    }
                    console.log('[2]');
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );*/
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel.findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                }
                else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newUser = {
                        facebook: {
                            id: profile.id,
                            token: token
                        },

                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email
                    };
                    userModel.createUser(newUser)
                        .then(function (newUser) {
                                if (newUser) {
                                    return done(null, newUser);
                                }
                                else {
                                    return done(null, false, {message: "User not created."})
                                }
                            },
                            function (err) {
                                return done(err);
                            });
                }
            });
    }

    function login(req, res) {
        console.log('[login]');
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel.createUser(newUser)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.sendStatus(400).send(err);
                        }
                        else {
                            res.json(user);
                        }
                    });
                }
            });
       /* userModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });*/
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

    function findAllUsers(req, res) {
      //  var userId = req.body;
        userModel.findAllUsers()
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(500);
            })
    }

    function followUser(req, res) {
        var userId = req.params.userId;
        var fwUser = req.body;
        console.log(fwUser);
        userModel
            .followUser(userId, fwUser)
            .then(function (response) {
                if (response.nModified == 1) {
                    res.sendStatus(200);
                }
            }, function (err) {
                res.sendStatus(500);
            })
    }

    function unfollowUser(req, res) {
        var userId = req.params.userId;
        var unFwlUser = req.body;
        userModel
            .unfollowUser(userId, unFwlUser)
            .then(function (response) {
                if (response.nModified == 1) {
                    res.sendStatus(200);
                }
            }, function (err) {
                res.sendStatus(500);
            })
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    console.log(err);
                    done(err, null);
                }
            );
    }
    
    function isAdmin(req, res) {
        if(req.isAuthenticated() && req.user.roles == "ADMIN") {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function searchUser(req, res) {
        var searchQuery = req.params.userQuery;
        console.log("in service with "+ searchQuery);
        userModel
            .searchUser(searchQuery)
            .then(function (response) {
                console.log("in seravice with response "+ response);
                res.json(response);
            }, function (err) {
                res.sendStatus(500);
            })
    }
/*
    function displayReviews(req, res) {
        var userId = req.params.userId;
        userModel
            .displayReviews(userId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(500);
            })
    }*/

};