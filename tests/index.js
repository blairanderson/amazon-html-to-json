import { expect } from 'chai';
const { describe, it } = global;
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const opts = { encoding: 'utf-8' };

describe('parsers', () => {
  fs.readdirSync(path.join(__dirname, 'fixtures')).forEach(func => {
    describe(func, () => {
      fs.readdirSync(path.join(__dirname, 'fixtures', func)).forEach(fixture => {
        it(`should properly parse ${func}/${fixture}`, done => {
          fs.readFile(path.join(__dirname, 'fixtures', func, fixture), opts, (err, testData) => {
            const { parse, expectation } = require(`../src/${func}.js`);
            const context = cheerio.load(testData);
            const result = parse(context);
            expect(result).to.deep.equal(expectation[fixture]);
            done();
          });
        });
      });
    });
  });
});

describe('index.js', () => {
  it('should properly return a promise', done => {
    const lib = require('../src/index.js');
    const expectation = lib.parse('<html></html>');
    expect(expectation).to.deep.equal({
      buybox: {
        amazon: false,
        merchantLink: {
          fba: false,
          href: '',
          text: '',
        },
        price: {
          our_price: 0,
          currency: '',
        },
      },
      brand: {
        text: '',
        href: undefined,
      },
      media: {
        images: {
          count: 0,
          thumbnails: [],
        },
        videos: {
          count: 0,
          thumbnails: [],
        },
      },
      reviews: {
        text: 'Zero Customer Reviews',
        count: 0,
        rating: 'Not Applicable',
        ratingAverage: 0,
      },
      bullets: {
        count: 0,
        averageLength: 0,
        data: [],
      },
      aplus: {
        modules: 0,
      },
      variations: {
        exists: false,
        totalCombinations: 1,
        data: {
          style: [],
          color: [],
          size: [],
        },
      },
      breadcrumbs: [],
    });
    done();
  });
});
