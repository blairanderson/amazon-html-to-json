var CLEAN_TEXT = /\r?\n|\r|\t|  /g;

function cleanText(text) {
  return text.trim().replace(CLEAN_TEXT, '');
}

export const parse = $ => {
  const mapper = function (index, el) {
    const text = cleanText($(el).text());
    const asin = $(el).attr('data-defaultasin');
    const url = $(el).attr('data-dp-url');

    return {
      text,
      asin,
      url,
    };
  };

  const style = $('#twister #variation_style_name ul li')
    .map(mapper)
    .get();
  const size = $('#twister #variation_size_name ul li')
    .map(mapper)
    .get();

  const color = $('#twister #variation_color_name ul li')
    .map(function (index, el) {
      const asin = $(el).attr('data-defaultasin');
      const url = $(el).attr('data-dp-url');
      const text = cleanText(
        $(el)
          .find('img')
          .attr('alt')
      );
      return {
        text,
        asin,
        url,
      };
    })
    .get();

  const exists = style.length + color.length + size.length > 0;
  const totalCombinations = (style.length || 1) * (color.length || 1) * (size.length || 1);

  const data = {
    style,
    color,
    size,
  };

  return {
    exists,
    totalCombinations,
    data,
  };
};

export const expectation = {
  'twister.html': {
    exists: true,
    totalCombinations: 4,
    data: {
      style: [],
      color: [
        {
          text: 'Black',
          asin: 'B003O85DEI',
          url: '',
        },
        {
          text: 'Bronze',
          asin: 'B003O85DES',
          url: '/dp/B003O85DES/ref=twister_B01N9KALZ9?_encoding=UTF8&psc=1',
        },
        {
          text: 'Green',
          asin: 'B003O85DF2',
          url: '/dp/B003O85DF2/ref=twister_B01N9KALZ9?_encoding=UTF8&psc=1',
        },
        {
          text: 'White',
          asin: 'B003O85DFC',
          url: '/dp/B003O85DFC/ref=twister_B01N9KALZ9?_encoding=UTF8&psc=1',
        },
      ],
      size: [],
    },
  },
};
