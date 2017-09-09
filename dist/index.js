'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cheerio = require('cheerio');
var parseBreadCrumbs = require('./breadcrumbs').parse;
var parseAplus = require('./aplus').parse;
var parseBrand = require('./brand').parse;
var parseReviews = require('./reviews').parse;
var parseBuyBox = require('./buybox').parse;
var parseImages = require('./images').parse;
var parseBullets = require('./bullets').parse;
var parseVariations = require('./twister').parse;

var log = function log(title, object) {
  if (process.env.LOG === true || process.env.LOG === 'true') {
    console.log(title, (0, _stringify2.default)(object));
  }
};

var parse = exports.parse = function parse(html) {
  var $ = cheerio.load(html);
  var buybox = parseBuyBox($);
  log('buybox:', buybox);

  var brand = parseBrand($);
  log('brand', brand);

  var media = parseImages($);
  log('media', media);

  var reviews = parseReviews($);
  log('reviews', reviews);

  var bullets = parseBullets($);
  log('bullets', bullets);

  var aplus = parseAplus($);
  log('aplus', aplus);

  var variations = parseVariations($);
  log('variations', variations);

  var breadcrumbs = parseBreadCrumbs($);
  log('breadcrumbs', breadcrumbs);

  return {
    buybox: buybox,
    brand: brand,
    media: media,
    reviews: reviews,
    bullets: bullets,
    aplus: aplus,
    variations: variations,
    breadcrumbs: breadcrumbs
  };
};