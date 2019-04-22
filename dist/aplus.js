"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = exports.parse = function parse($) {
  var modules = $("#aplus .aplus-module").length;
  var module_sort = $("#aplus .aplus-module").map(function (index, div) {
    return $(div).attr("cel_widget_id");
  }).get();

  return {
    modules: modules,
    module_sort: module_sort
  };
};

var expectation = exports.expectation = {
  "aplus.html": {
    modules: 4,
    module_sort: ["aplus-module-1", "aplus-module-9", "aplus-module-5", "aplus-module-5"]
  }
};