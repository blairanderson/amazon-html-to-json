'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = exports.parse = function parse($) {
  var ratingContainer = $('#acrPopover').attr('title');
  var hasAnyReviews = ratingContainer && typeof ratingContainer.replace === 'function';

  if (hasAnyReviews) {
    var rating = ratingContainer;
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
  } else {
    return {
      text: 'Zero Customer Reviews',
      count: 0,
      rating: 'Not Applicable',
      ratingAverage: 0.0
    };
  }
};

var expectation = exports.expectation = {
  count: 0,
  rating: 'Not Applicable',
  ratingAverage: 0,
  text: 'Zero Customer Reviews'
};