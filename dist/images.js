'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = exports.parse = function parse($) {
  var videoEls = $('#imageBlock li.item.videoThumbnail img');
  var imageEls = $('#imageBlock li.item.imageThumbnail img');
  return {
    images: { count: imageEls.length, thumbnails: [] },
    videos: { count: videoEls.length, thumbnails: [] }
  };
};

var expectation = exports.expectation = {
  images: { count: 4, thumbnails: [] },
  videos: { count: 1, thumbnails: [] }
};