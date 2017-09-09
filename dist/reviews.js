'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = exports.parse = function parse($) {
  var rating = $('#acrPopover').attr('title');
  var ratingAverage = parseFloat(rating.replace(/,/g, ''));
  // for some reason this is duplicated.
  var textRaw = $('#acrCustomerReviewLink #acrCustomerReviewText').text().trim();

  // "675 customer reviews"
  var text = textRaw.slice(0, textRaw.length / 2);
  var count = parseInt(text.replace(/,/g, ''));

  return {
    text: text,
    count: count,
    rating: rating,
    ratingAverage: ratingAverage
  };
};