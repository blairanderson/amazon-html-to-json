'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = exports.parse = function parse($) {
  var brandEl = $('a#bylineInfo');
  return {
    text: brandEl.text().trim(),
    href: brandEl.attr('href')
  };
};