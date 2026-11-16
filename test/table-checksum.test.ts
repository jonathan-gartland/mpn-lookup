import { createHash } from 'node:crypto';
import { assert } from 'chai';
import {
  getQtMpn,
  getQt2KMpn,
  getQtLegio,
  MAX_QT_MPN_INDEX,
  MAX_2K_LARGE_POS,
  MAX_2K_SMALL_POS,
  MAX_LEGIO_LARGE_POS,
  MAX_LEGIO_SMALL_POS,
} from '../mpn.lookup';

// The MPN tables are transcribed from the IDEXX PDFs and must never change.
// This hashes every lookup result (plus one out-of-range value on each side)
// so any change to a table value, a bound or an index calculation fails here.
// Do not update EXPECTED to make this pass.
const EXPECTED =
  'ee39c7ab82192c1a2b09f9b57dd5956372e0cccb20b2204e61d2fa4da48aac7a';

const tableFingerprint = (): string => {
  const results: unknown[] = [
    MAX_QT_MPN_INDEX,
    MAX_2K_LARGE_POS,
    MAX_2K_SMALL_POS,
    MAX_LEGIO_LARGE_POS,
    MAX_LEGIO_SMALL_POS,
  ];
  for (let i = -1; i <= MAX_QT_MPN_INDEX + 1; i++) {
    results.push(['qt', i, getQtMpn(i)]);
  }
  for (let l = -1; l <= MAX_2K_LARGE_POS + 1; l++) {
    for (let s = -1; s <= MAX_2K_SMALL_POS + 1; s++) {
      results.push(['qt2k', l, s, getQt2KMpn(l, s)]);
    }
  }
  for (let l = -1; l <= MAX_LEGIO_LARGE_POS + 1; l++) {
    for (let s = -1; s <= MAX_LEGIO_SMALL_POS + 1; s++) {
      results.push(['legio', l, s, getQtLegio(l, s)]);
    }
  }
  return createHash('sha256').update(JSON.stringify(results)).digest('hex');
};

describe('MPN table data', () => {
  it('matches the published IDEXX tables (checksum)', () => {
    assert.equal(tableFingerprint(), EXPECTED);
  });
});
