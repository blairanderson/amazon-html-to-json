'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CLEAN_TEXT = /\r?\n|\r|\t|  /g;

function cleanText(text) {
  return text.trim().replace(CLEAN_TEXT, '');
}

var parse = exports.parse = function parse($) {
  var mapper = function mapper(index, el) {
    var text = cleanText($(el).text());
    var asin = $(el).attr('data-defaultasin');
    var url = $(el).attr('data-dp-url');

    return {
      text: text,
      asin: asin,
      url: url
    };
  };

  var style = $('#twister #variation_style_name ul li').map(mapper).get();
  var size = $('#twister #variation_size_name ul li').map(mapper).get();

  var color = $('#twister #variation_color_name ul li').map(function (index, el) {
    var asin = $(el).attr('data-defaultasin');
    var url = $(el).attr('data-dp-url');
    var text = cleanText($(el).find('img').attr('alt'));
    return {
      text: text,
      asin: asin,
      url: url
    };
  }).get();

  var exists = style.length + color.length + size.length > 0;
  var totalCombinations = (style.length || 1) * (color.length || 1) * (size.length || 1);

  var data = {
    style: style,
    color: color,
    size: size
  };

  return {
    exists: exists,
    totalCombinations: totalCombinations,
    data: data
  };
};

var expectation = exports.expectation = {
  'twister.html': {
    exists: true,
    totalCombinations: 4,
    data: {
      style: [],
      color: [{
        text: 'Black',
        asin: 'B003O85DEI',
        url: ''
      }, {
        text: 'Bronze',
        asin: 'B003O85DES',
        url: '/dp/B003O85DES/ref=twister_B01N9KALZ9?_encoding=UTF8&psc=1'
      }, {
        text: 'Green',
        asin: 'B003O85DF2',
        url: '/dp/B003O85DF2/ref=twister_B01N9KALZ9?_encoding=UTF8&psc=1'
      }, {
        text: 'White',
        asin: 'B003O85DFC',
        url: '/dp/B003O85DFC/ref=twister_B01N9KALZ9?_encoding=UTF8&psc=1'
      }],
      size: []
    }
  }
};