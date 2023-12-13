import { getQtMpn, getQt2KMpn, getQtLegio } from '../mpn.lookup';
import { expect, assert, should } from 'chai';
should();
describe('Test MPN Lookup for QT, QT2K, QT Legio. tables', () => {
  it('tests the Quanti Tray Colilert Lookup values', () => {
    let mpnVal = getQtMpn(51);
    if (mpnVal != null) {
      expect(mpnVal).to.be.an('array');
      assert.equal(mpnVal[1], 146.1);
      mpnVal.should.have.lengthOf(3);
      mpnVal.should.contain('infinite');
    }
    for (let i = 0; i < 52; i++) {
      mpnVal = getQtMpn(i);
      if (mpnVal != null) {
        expect(mpnVal).to.be.an('array');
      }
    }
    [-1, 52].forEach((pos) => {
      mpnVal = getQtMpn(pos);
      assert.equal(undefined, mpnVal);
    });
  });

  it('tests the Quanti Tray 2000 Lookup values', async () => {
    let mpnVal = getQt2KMpn(22, 23);
    if (mpnVal != null) {
      assert.equal(3, mpnVal.length);
      assert.deepEqual(mpnVal, [60.8, 45.7, 78.6]);
      expect(mpnVal).to.be.an('array');
    }
    mpnVal = getQt2KMpn(49, 48);
    if (mpnVal != null) {
      assert.deepEqual(mpnVal, ['>2419.6', 1439.5, 'infinite']);
      expect(mpnVal[2].valueOf()).is.equal('infinite');
    }

    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 49; j++) {
        mpnVal = getQt2KMpn(i, j);
        if (mpnVal != null) {
          assert.exists(mpnVal);
        }
      }
    }
    [
      [-1, 48],
      [50, 48],
      [49, -1],
      [49, 49],
    ].forEach((pos) => {
      const inL = pos[0];
      const inS = pos[1];
      mpnVal = getQt2KMpn(inL, inS);
      //   mpnVal = getQt2KMpn(0, 0);
      if (mpnVal != null) {
        throw new Error(
          'should be undefined, valid input used for invalid input test'
        );
      } else {
        const isUndef: boolean = mpnVal === undefined;
        assert.equal(true, isUndef);
      }
    });
  });

  it('tests the Quanti Tray Legiolert Lookup values', async () => {
    let mpnVal: any = getQtLegio(0, 1);
    if (mpnVal != null) {
      expect(mpnVal).to.be.an('number');
    }
    mpnVal = getQtLegio(0, 0);
    assert.equal(mpnVal, '<1');
    mpnVal = getQtLegio(6, 90);
    assert.equal(mpnVal, '>2272.6');

    for (let i = 0; i < 90; i++) {
      for (let j = 0; j < 7; j++) {
        mpnVal = getQtLegio(i, j);
        if (mpnVal != null) {
          assert.exists(mpnVal);
        }
      }
    }

    [
      [-1, 90],
      [7, 90],
      [0, -1],
      [6, 91],
    ].forEach((pos) => {
      const inL = pos[0];
      const inS = pos[1];
      mpnVal = getQtLegio(inL, inS);
      if (mpnVal != null) {
        throw new Error(
          'should be undefined, valid input used for invalid input test'
        );
      } else {
        const isUndef: boolean = mpnVal === undefined;
        assert.equal(true, isUndef);
      }
    });
  });
});
