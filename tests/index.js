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
