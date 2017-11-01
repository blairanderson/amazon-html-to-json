'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var lodash = require('lodash');

var parse = exports.parse = function parse($) {
  // const videoEls = $('#imageBlock li.item.videoThumbnail img');
  // const imageEls = $('#imageBlock li.item.imageThumbnail img');
  // .match(/('colorImages.*)\S/);
  var str = $.html().split('ImageBlockATF')[1].split("A.trigger('P.AboveTheFold')")[0].split('var data = ')[1].split(';')[0];
  var matches = eval('(' + str + ')');
  var images = matches['colorImages']['initial'];

  return {
    images: {
      count: images.length,
      thumbnails: lodash.map(images, function (image) {
        return _.pick(image, ['hiRes', 'large', 'lowRes', 'thumb', 'variant']);
      })
    },
    videos: { count: matches['totalVideoCount'], thumbnails: [] }
  };
};

var expectation = exports.expectation = {
  'images.html': {
    images: { count: 4, thumbnails: [] },
    videos: { count: 1, thumbnails: [] }
  },
  'imageblock.html': {
    images: { count: 4, thumbnails: [] },
    videos: { count: 1, thumbnails: [] }
  }
};