module.exports = function () {
  var model=null;

  var mongoose = require("mongoose");
  var WidgetSchema = require('./widget.schema.server')();
  var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
  var q = require("q");
  mongoose.Promise = q.Promise;
    var fs = require("fs");
    var publicDirectory =__dirname+"/../../../public";

  var api = {
      "createWidget"            :createWidget,
      "findAllWidgetsForPage"   :findAllWidgetsForPage,
      "findWidgetById"          :findWidgetById,
      "updateWidget"            :updateWidget,
      "deleteWidget"            :deleteWidget,
      "reorderWidget"           :reorderWidget,
      "setModel"                :setModel
  };
  return api;

  function createWidget(pageId, widget) {
      return WidgetModel
          .create(widget)
          .then(function (widget) {
              return model.pageModel
                  .findPageById(pageId)
                  .then(function (page) {
                      widget._page = page._id;
                      page.widgets.push(widget._id);
                      widget.save();
                      page.save();
                      return widget;
                  }, function (err) {
                      res.sendStatus(404);
                  });
          }, function (err) {
              return err;
          });
  }
  
  function findAllWidgetsForPage(pageId) {
      return model.pageModel
          .findPageById(pageId)
          .then(function (page){
              var widgets = page.widgets;
              return widgets;
             // return widgetsOfPg;
          });
     /* return WidgetModel.find({_page: pageId})
          .exec()
          .then(function (widgets) {
              return widgets;
          });*/
     /* return model.pageModel
          .findPageById(pageId)
          .then(function (page) {
              var widgetsOfPg = page.widgets;
              var noOfWidgets = widgetsOfPg.length;
              var widgetCollectnForPg = [];

              return getWidgetsRecursively(noOfWidgets, widgetsOfPg, widgetCollectnForPg);
          }, function (err) {
              return err;
          });*/
  }
  
  /*function getWidgetsRecursively(noOfWidgets, widgetsOfPg, widgetCollectnForPg) {
      if(noOfWidgets == 0){
          return widgetCollectnForPg;
      }

      return WidgetModel.findById(widgetsOfPg.shift()).select('-__v')
          .then(function (widget) {
              widgetCollectnForPg.push(widget);
              return getWidgetsRecursively(--noOfWidgets, widgetsOfPg, widgetCollectnForPg);
          }, function (err) {
              res.sendStatus(404);
          })
  }*/
  
  function findWidgetById(widgetId) {
      return WidgetModel.findById(widgetId)
          .exec()
          .then(function (widget) {
              return widget;
          });
      //return WidgetModel.findById(widgetId).select('-__v');
  }

  function updateWidget(widgetId, widget) {
      return WidgetModel.update({_id: widgetId}, {$set: widget});
  }

  function deleteWidget(widgetId) {
      return WidgetModel.findById(widgetId)
          .exec()
          .then(function (widget) {
              return widget.remove();
          });
  }
  
  function reorderWidget(pageId, start, end) {
      return model.pageModel
          .findPageById(pageId)
          .then(function (page) {
              page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
              page.save();
              page.markModified(page.widgets);
              return 200;
          }, function (err) {
              return err;
          });
  }
  
    function setModel(_model) {
        model = _model;
    }
};