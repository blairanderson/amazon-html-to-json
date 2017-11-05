'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var lodash = require('lodash');

var parse = exports.parse = function parse($) {
  var mainSplitter = "ImageBlockATF', function (A) {";
  // P.when("ImageBlockATF").execute(function(imblock){
  // debugger
  // })
  var str = $.html();
  // return early if these things are not present
  if (str.indexOf(mainSplitter) === -1) {
    return {
      images: { count: 0, thumbnails: [] },
      videos: { count: 0, thumbnails: [] }
    };
  }

  str = str.split(mainSplitter)[1].split('var data =')[1].split(';')[0];

  // console.log(str);
  // https://stackoverflow.com/questions/9036429/convert-object-string-to-json
  var matches = eval('(' + str + ')');

  var images = matches['colorImages']['initial'];
  var thumbnails = lodash.map(images, function (image) {
    return lodash.pick(image, ['hiRes', 'large', 'lowRes', 'thumb', 'variant']);
  });
  var count = images.length;

  var resp = {
    images: { count: count, thumbnails: thumbnails },
    videos: { count: parseInt(matches['totalVideoCount']), thumbnails: [] }
  };
  // console.log(JSON.stringify(resp, null, 4));
  return resp;
};

var expectation = exports.expectation = {
  'images.html': {
    images: {
      count: 5,
      thumbnails: [{
        hiRes: 'https://images-na.ssl-images-amazon.com/images/I/51I07uM0%2BuL._SL1000_.jpg',
        large: 'https://images-na.ssl-images-amazon.com/images/I/41LaA9qBXnL.jpg',
        lowRes: null,
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/41LaA9qBXnL._SS40_.jpg',
        variant: 'MAIN'
      }, {
        hiRes: null,
        large: 'https://images-na.ssl-images-amazon.com/images/I/51AXcXeTs7L.jpg',
        lowRes: null,
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51AXcXeTs7L._SS40_.jpg',
        variant: 'PT01'
      }, {
        hiRes: 'https://images-na.ssl-images-amazon.com/images/I/616ufAUr09L._SL1244_.jpg',
        large: 'https://images-na.ssl-images-amazon.com/images/I/41LxikBasEL.jpg',
        lowRes: null,
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/41LxikBasEL._SS40_.jpg',
        variant: 'PT02'
      }, {
        hiRes: 'https://images-na.ssl-images-amazon.com/images/I/61DDMJrXY7L._SL1245_.jpg',
        large: 'https://images-na.ssl-images-amazon.com/images/I/41IPA6DdnaL.jpg',
        lowRes: null,
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/41IPA6DdnaL._SS40_.jpg',
        variant: 'PT03'
      }, {
        hiRes: 'https://images-na.ssl-images-amazon.com/images/I/71dN0bA%2B1zL._SL1500_.jpg',
        large: 'https://images-na.ssl-images-amazon.com/images/I/31g10oKfxlL.jpg',
        lowRes: null,
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/31g10oKfxlL._SS40_.jpg',
        variant: 'PT04'
      }]
    },
    videos: {
      count: 0,
      thumbnails: []
    }
  }
};