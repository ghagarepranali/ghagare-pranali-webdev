module.exports = function () {
  var mongoose = require('mongoose');

  console.log("in schema");
  var UserSchema = mongoose.Schema({
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
      dateCreated: {type:Date, default: Date.now()}
  },{collection: 'assignment.users'});


    UserSchema.pre('remove', function (next) {
        var user = this;
        return user.model('WebsiteModel').find({_id: {$in: user.websites}}).remove().exec()
            .then(function () {
                user.model('PageModel').find({_website: {$in: user.websites}}).exec()
                    .then(function (pages) {
                        user.model('PageModel').remove({_id: {$in: pages}}).exec()
                            .then(function () {
                                return user.model('WidgetModel').find({_page: {$in: pages}}).remove().exec()
                                    .then(function () {
                                        next();
                                    });
                            })
                    })
            });
    });


    return UserSchema;
};