module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        google: {
            id: String
        },
        facebook: {
            id: String
        },
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        imgUrl: String,
        phone: String,
        likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel'}],
        reviewed:[{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        roles: {type:String, default:'USER', enum: ['USER', 'ADMIN', 'CRITIC']},
        dateCreated: {type:Date, default: Date.now()}
    },{collection: 'project.food.users'});

    return UserSchema;
};