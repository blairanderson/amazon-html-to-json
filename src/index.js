const parseBreadCrumbs = require("./breadcrumbs").parse;
const parseAplus = require("./aplus").parse;
const parseBrand = require("./brand").parse;
const parseReviews = require("./reviews").parse;
const parseBuyBox = require("./buybox").parse;
const parseImages = require("./images").parse;
const parseBullets = require("./bullets").parse;
const parseVariations = require("./twister").parse;
const parseReplacements = require("./replacements").parse;

export {
  parseBreadCrumbs,
  parseAplus,
  parseBrand,
  parseReviews,
  parseBuyBox,
  parseImages,
  parseBullets,
  parseVariations,
  parseReplacements
};

const log = (title, object) => {
  if (process.env.LOG === true || process.env.LOG === "true") {
    console.log(title, JSON.stringify(object));
  }
};

export const parse = ($, ImageBlock) => {
  const buybox = parseBuyBox($);
  log("buybox:", buybox);

  const brand = parseBrand($);
  log("brand", brand);

  const reviews = parseReviews($);
  log("reviews", reviews);

  const bullets = parseBullets($);
  log("bullets", bullets);

  const aplus = parseAplus($);
  log("aplus", aplus);

  const variations = parseVariations($);
  log("variations", variations);

  const breadcrumbs = parseBreadCrumbs($);
  log("breadcrumbs", breadcrumbs);

  const media = parseImages($, ImageBlock);
  log("media", media);

  const replacementWidget = parseReplacements($);

  return {
    buybox,
    brand,
    media,
    reviews,
    bullets,
    aplus,
    variations,
    breadcrumbs,
    replacementWidget
  };
};
