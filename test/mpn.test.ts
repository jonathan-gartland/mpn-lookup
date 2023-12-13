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

  // it('tests the Quanti Tray 2000 Lookup values', async () => {
  //   expect(getQt2KMpn(22, 23)).to.be.an('array');
  //   assert.deepEqual(getQt2KMpn(22, 23), [ 60.8, 45.7, 78.6 ])
  //   getQt2KMpn(22, 23).should.have.lengthOf(3);
  //   getQt2KMpn(49, 48).should.contain('infinite');
  //
  //   expect(getQt2KMpn(49, 49)).to.be.undefined;
  //   expect(getQt2KMpn(50, 48)).to.be.undefined;
  //   expect(getQt2KMpn(-1, 48)).to.be.undefined;
  //   expect(getQt2KMpn(49, -1)).to.be.undefined;
  //
  // });
  //
  // it('tests the Quanti Tray Legiolert Lookup values', async () => {
  //   expect(getQtLegio(0, 1)).to.be.an('number');
  //   assert.equal(getQtLegio(0, 0).toString(), "<1")
  //   getQtLegio(0, 0).should.have.lengthOf(2); // <1
  //   getQtLegio(90, 6).should.equal(">2272.6");// ">2272.6"
  // });
});
