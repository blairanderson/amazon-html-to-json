import { expect } from 'chai';
const { describe, it } = global;
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const TESTS = ['images', 'breadcrumbs', 'bullets', 'twister'];
const opts = { encoding: 'utf-8' };

function testMe(func) {
  it(`${func} should properly parse`, (done) => {
    fs.readFile(path.join(__dirname, 'fixtures', `${func}.html`), opts, (err, testData) => {
      const { parse, expectation } = require(`../src/${func}.js`);
      const context = cheerio.load(testData);
      const result = parse(context);
      expect(result).to.deep.equal(expectation);
      done();
    });
  });
}

describe('parsers', () => {
  TESTS.forEach(testMe);
});
