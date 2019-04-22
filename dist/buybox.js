'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = exports.parse = function parse($) {
  var merchantEl = $('#merchant-info');
  var merchantString = merchantEl.text().trim().split('Gift-wrap available.')[0];

  var amazon = merchantString.indexOf('Ships from and sold by Amazon') > -1;

  var merchantLink = {
    fba: merchantString.indexOf('Fulfilled by Amazon') > -1,
    href: merchantEl.find('a').attr('href') || '',
    text: merchantEl.find('a').text().trim().replace('Fulfilled by Amazon', '').replace('easy-to-open packaging', '') || ''
  };

  var priceEl = $('#priceblock_ourprice');
  var currency = priceEl.text().split('-')[0].trim();
  var our_price = Number(currency.replace(/[^0-9\.-]+/g, ''));

  return {
    amazon: amazon,
    merchantLink: merchantLink,
    price: {
      our_price: our_price,
      currency: currency
    }
  };
};

var expectation = exports.expectation = {
  'default.html': {
    amazon: false,
    merchantLink: {
      fba: false,
      href: '/gp/help/seller/at-a-glance.html/ref=dp_merchant_link?ie=UTF8&seller=A1ZOQN6XFYI8V5',
      text: 'Verona Safety Supply'
    },
    price: {
      currency: '$85.95',
      our_price: 85.95
    }
  },
  'range.html': {
    amazon: false,
    merchantLink: {
      fba: false,
      href: '',
      text: ''
    },
    price: {
      currency: '$84.99',
      our_price: 84.99
    }
  }
};