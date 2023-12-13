import { getQtMpn, getQt2KMpn, getQtLegio } from '../mpn.lookup';
import  { expect,  assert, should } from 'chai';
should();
describe('Test MPN Lookup for QT, QT2K, QT Legio. tables', () => {
  it('tests the Quanti Tray Colilert Lookup values', async () => {
    let mpnVal = getQtMpn(51);
    if(mpnVal){
      expect(mpnVal).to.be.an('array');
      assert.equal(mpnVal[1], 146.1);
      mpnVal.should.have.lengthOf(3);
      mpnVal.should.contain('infinite');
    }
    for (let i = 0; i < 52; i++) {
      mpnVal = getQtMpn(i);
      if(mpnVal) {
        expect(mpnVal).to.exist;
      }
    }
    [-1, 52].forEach((pos) => {
      mpnVal = getQtMpn(pos);
      if(mpnVal) {
        throw new Error('should be undefined, valid input used for invalid input test');
      }
      else
        expect(mpnVal).to.be.undefined;
    })
  });

  it('tests the Quanti Tray 2000 Lookup values',  async () => {
    let mpnVal =  getQt2KMpn(22, 23);
    if (mpnVal){
      assert.equal(3, mpnVal.length)
      assert.deepEqual(mpnVal, [ 60.8, 45.7, 78.6 ])
      expect(mpnVal).to.be.an('array');
    }
    mpnVal = getQt2KMpn(49, 48);
    if (mpnVal){
      assert.deepEqual(mpnVal, [ '>2419.6', 1439.5, 'infinite' ])
      expect(mpnVal[2].valueOf()).is.equal('infinite');
    }

    for (let i = 0; i < 50; i++) {
      for ( let j = 0; j< 49; j++) {
        mpnVal = getQt2KMpn(i, j);
        if (mpnVal) {
          expect(mpnVal).to.exist;
        }
      }
    }
    [[-1, 48], [50, 48], [49, -1], [49, 49]].forEach((pos) => {
      let inL = pos[0];
      let inS = pos[1];
      mpnVal = getQt2KMpn(inL, inS);
      if(mpnVal) {
        throw new Error('should be undefined, valid input used for invalid input test');
      }
      else
        expect(mpnVal).to.be.undefined;
    });
  });

  // it('tests the Quanti Tray Legiolert Lookup values', async () => {
  //   expect(getQtLegio(0, 1)).to.be.an('number');
  //   assert.equal(getQtLegio(0, 0).toString(), "<1")
  //   getQtLegio(0, 0).should.have.lengthOf(2); // <1
  //   getQtLegio(90, 6).should.equal(">2272.6");// ">2272.6"
  // });
});
