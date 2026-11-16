import { assert } from 'chai';
import { getQtMpn, getQt2KMpn } from '../mpn.lookup';

describe('lookup result immutability', () => {
  it('throws when mutating a getQtMpn result and leaves later lookups unchanged', () => {
    const before = JSON.stringify(getQtMpn(5));
    const result = getQtMpn(5) as unknown as unknown[];
    assert.throws(() => {
      result[2] = 'x';
    }, TypeError);
    assert.throws(() => {
      result.push('y');
    }, TypeError);
    assert.strictEqual(JSON.stringify(getQtMpn(5)), before);
  });

  it('throws when mutating a getQt2KMpn result and leaves later lookups unchanged', () => {
    const before = JSON.stringify(getQt2KMpn(10, 25));
    const result = getQt2KMpn(10, 25) as unknown as unknown[];
    assert.throws(() => {
      result[1] = 999;
    }, TypeError);
    assert.strictEqual(JSON.stringify(getQt2KMpn(10, 25)), before);
  });

  it('returns frozen tuples', () => {
    assert.isTrue(Object.isFrozen(getQtMpn(0)));
    assert.isTrue(Object.isFrozen(getQt2KMpn(0, 0)));
  });
});
