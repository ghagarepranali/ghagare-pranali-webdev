

var connectionString = 'mongodb://127.0.0.1:27017/project';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

// made changes to support heroku
/* if(process.env.MONGODB_URI){
 connectionString = process.env.MONGODB_URI;
 }*/

console.log(connectionString);
var mongoose = require("mongoose");
mongoose.connect(connectionString);


module.exports = function (app) {
    var models = require('./model/models.server')();
    require("./services/user.service.server.js")(app, models.userModel);
    require("./services/recipe.service.server.js")(app, models.recipeModel, models.userModel);
    require("./services/review.service.server.js")(app, models.reviewModel);
};