'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SELECTOR = '#wayfinding-breadcrumbs_feature_div ul li a.a-link-normal';

var parse = exports.parse = function parse($) {
  return $(SELECTOR).map(function extract(index) {
    return {
      index: index,
      href: $(this).attr('href'),
      title: $(this).text().trim()
    };
  }).get();
};

var expectation = exports.expectation = {
  'breadcrumbs.html': [{
    index: 0,
    href: '/Tools-and-Home-Improvement/b/ref=dp_bc_1?ie=UTF8&node=228013',
    title: 'Tools & Home Improvement'
  }, {
    index: 1,
    href: '/Electrical-Equipment-and-Light-Bulbs/b/ref=dp_bc_2?ie=UTF8&node=495266',
    title: 'Electrical'
  }, {
    index: 2,
    href: '/Electrical-Boxes-Conduit-Fittings/b/ref=dp_bc_3?ie=UTF8&node=6369359011',
    title: 'Electrical Boxes, Conduit & Fittings'
  }, {
    index: 3,
    href: '/Electrical-Brackets/b/ref=dp_bc_4?ie=UTF8&node=6369372011',
    title: 'Brackets'
  }]
};