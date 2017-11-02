const lodash = require('lodash');

export const parse = $ => {
  let str = $.html();
  // return early if these things are not present
  if (str.indexOf('ImageBlockATF') === -1 || str.indexOf("A.trigger('P.AboveTheFold')") === -1) {
    return {
      images: { count: 0, thumbnails: [] },
      videos: { count: 0, thumbnails: [] },
    };
  }

  str
    .split('ImageBlockATF')[1]
    .split("A.trigger('P.AboveTheFold')")[0]
    .split('var data = ')[1]
    .split(';')[0];

  // https://stackoverflow.com/questions/9036429/convert-object-string-to-json
  let matches = eval('(' + str + ')');
  let images = matches['colorImages']['initial'];
  let thumbnails = lodash.map(images, image =>
    lodash.pick(image, ['hiRes', 'large', 'lowRes', 'thumb', 'variant'])
  );
  let count = images.length;

  return {
    images: { count, thumbnails },
    videos: { count: parseInt(matches['totalVideoCount']), thumbnails: [] },
  };
};

export const expectation = {
  'images.html': {
    images: {
      count: 6,
      thumbnails: [
        {
          hiRes: 'https://images-na.ssl-images-amazon.com/images/I/61eRbqyBvnL._SL1500_.jpg',
          large: 'https://images-na.ssl-images-amazon.com/images/I/41JmjikNbUL.jpg',
          lowRes: null,
          thumb: 'https://images-na.ssl-images-amazon.com/images/I/41JmjikNbUL._SS40_.jpg',
          variant: 'MAIN',
        },
        {
          hiRes: 'https://images-na.ssl-images-amazon.com/images/I/713%2BexicbML._SL1500_.jpg',
          large: 'https://images-na.ssl-images-amazon.com/images/I/41CZHfFVyhL.jpg',
          lowRes: null,
          thumb: 'https://images-na.ssl-images-amazon.com/images/I/41CZHfFVyhL._SS40_.jpg',
          variant: 'PT01',
        },
        {
          hiRes: 'https://images-na.ssl-images-amazon.com/images/I/81-B1EE5RbL._SL1500_.jpg',
          large: 'https://images-na.ssl-images-amazon.com/images/I/51Ruaz7fcSL.jpg',
          lowRes: null,
          thumb: 'https://images-na.ssl-images-amazon.com/images/I/51Ruaz7fcSL._SS40_.jpg',
          variant: 'PT02',
        },
        {
          hiRes: 'https://images-na.ssl-images-amazon.com/images/I/71B9dP%2BXTZL._SL1500_.jpg',
          large: 'https://images-na.ssl-images-amazon.com/images/I/41CHP4vhrTL.jpg',
          lowRes: null,
          thumb: 'https://images-na.ssl-images-amazon.com/images/I/41CHP4vhrTL._SS40_.jpg',
          variant: 'PT03',
        },
        {
          hiRes: 'https://images-na.ssl-images-amazon.com/images/I/61nJO476LfL._SL1500_.jpg',
          large: 'https://images-na.ssl-images-amazon.com/images/I/41KcZXTGJfL.jpg',
          lowRes: null,
          thumb: 'https://images-na.ssl-images-amazon.com/images/I/41KcZXTGJfL._SS40_.jpg',
          variant: 'PT04',
        },
        {
          hiRes: null,
          large: 'https://images-na.ssl-images-amazon.com/images/I/31Dz3JGAVFL.jpg',
          lowRes: null,
          thumb: 'https://images-na.ssl-images-amazon.com/images/I/31Dz3JGAVFL._SS40_.jpg',
          variant: 'PT05',
        },
      ],
    },
    videos: { count: 0, thumbnails: [] },
  },
};
