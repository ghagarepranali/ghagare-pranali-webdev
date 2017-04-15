module.exports = function (app) {
    var models = require('./model/models.server')();
    require("./services/user.service.server.js")(app, models.userModel);
    require("./services/recipe.service.server.js")(app, models.recipeModel, models.userModel);
    require("./services/review.service.server.js")(app, models.reviewModel);
};