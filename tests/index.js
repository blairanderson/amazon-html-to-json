import { expect } from 'chai';
import { parse } from '../src/index.js';
const { describe, it } = global;

describe('parse', () => {
  it('should properly parse and entire amazon detail page', () => {
    const result = parse("html");
    expect(result).to.be.equal({});
  });
});
