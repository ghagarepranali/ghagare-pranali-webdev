module.exports = function() {
    var mongoose = require("mongoose");

    console.log("in widgets");
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        widgetType: {type:String, enum:['HEADER','IMAGE','YOUTUBE','HTML','TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.widgets"});


    WidgetSchema.pre('remove', function (next) {
        this.model('PageModel').update({_id: this._page}, {$pull: {widgets: this._id}}, next);
    });

    return WidgetSchema;
};