module.exports = function () {
  var mongoose = require("mongoose");

  var PageSchema  = mongoose.Schema({
      _website: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
      name: String,
      title: String,
      description: String,
      widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
      dateCreated: {type: Date, default: Date.now()}
  }, {collection: "assignment.pages"});

    PageSchema.pre('remove', function (next) {
        var page = this;
        page.model('WidgetModel').find({_page: {$in: page.widgets}}).remove().exec()
            .then(function () {
                return page.model('WebsiteModel').update({_id: page._website}, {$pull: {pages: page._id}}, next);
            });
    });

  return PageSchema;
};