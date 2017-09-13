export const parse = $ => {
  const merchantEl = $('#merchant-info');
  console.log('MERCHANT EL', merchantEl.text());
  const merchantString = merchantEl
    .text()
    .trim()
    .split('Gift-wrap available.')[0];
  console.log(merchantString);
  const amazon = merchantString.indexOf('Ships from and sold by Amazon') > -1;

  const merchantLink = {
    fba: merchantString.indexOf('Fulfilled by Amazon') > -1,
    href: merchantEl.find('a').attr('href') || '',
    text:
      merchantEl
        .find('a')
        .text()
        .trim()
        .replace('Fulfilled by Amazon', '')
        .replace('easy-to-open packaging', '') || '',
  };

  const priceEl = $('#priceblock_ourprice');
  const currency = priceEl
    .text()
    .split('-')[0]
    .trim();
  const our_price = Number(currency.replace(/[^0-9\.-]+/g, ''));

  return {
    amazon,
    merchantLink,
    price: {
      our_price,
      currency,
    },
  };
};

export const expectation = {
  'default.html': {
    amazon: false,
    merchantLink: {
      fba: false,
      href: '/gp/help/seller/at-a-glance.html/ref=dp_merchant_link?ie=UTF8&seller=A1ZOQN6XFYI8V5',
      text: 'Verona Safety Supply',
    },
    price: {
      currency: '$85.95',
      our_price: 85.95,
    },
  },
  'range.html': {
    amazon: false,
    merchantLink: {
      fba: false,
      href: '',
      text: '',
    },
    price: {
      currency: '$84.99',
      our_price: 84.99,
    },
  },
};
