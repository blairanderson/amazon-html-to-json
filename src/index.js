const cheerio = require('cheerio');
const parseBreadCrumbs = require('./breadcrumbs').parse;
const parseAplus = require('./aplus').parse;
const parseBrand = require('./brand').parse;
const parseReviews = require('./reviews').parse;
const parseBuyBox = require('./buybox').parse;
const parseImages = require('./images').parse;
const parseBullets = require('./bullets').parse;
const parseVariations = require('./twister').parse;

const log = (title, object) => {
  if (process.env.LOG === true || process.env.LOG === 'true') {
    console.log(title, JSON.stringify(object));
  }
};

export const parse = (html) => {
  const $ = cheerio.load(html);
  const buybox = parseBuyBox($);
  log('buybox:', buybox);

  const brand = parseBrand($);
  log('brand', brand);

  const media = parseImages($);
  log('media', media);

  const reviews = parseReviews($);
  log('reviews', reviews);

  const bullets = parseBullets($);
  log('bullets', bullets);

  const aplus = parseAplus($);
  log('aplus', aplus);

  const variations = parseVariations($);
  log('variations', variations);

  const breadcrumbs = parseBreadCrumbs($);
  log('breadcrumbs', breadcrumbs);

  return {
    buybox,
    brand,
    media,
    reviews,
    bullets,
    aplus,
    variations,
    breadcrumbs,
  };
};
