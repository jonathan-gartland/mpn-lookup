import { getQtMpn, getQt2KMpn, getQtLegio } from '../mpn.lookup';
import  { expect,  assert, should } from 'chai';
should();
describe('Test MPN Lookup for QT, QT2K, QT Legio. tables', () => {
  it('tests the Quanti Tray Colilert Lookup values', async () => {
    assert.equal(1,1);
    expect(getQtMpn(51)).to.be.an('array');
    assert.equal(getQtMpn(51)[1], 146.1)
    getQtMpn(51).should.have.lengthOf(3);
    getQtMpn(51).should.contain('infinite');
  });

  it('tests the Quanti Tray 2000 Lookup values', async () => {
    expect(getQt2KMpn(22, 23)).to.be.an('array');
    assert.deepEqual(getQt2KMpn(22, 23), [ 60.8, 45.7, 78.6 ])
    getQt2KMpn(22, 23).should.have.lengthOf(3);
    getQt2KMpn(49, 48).should.contain('infinite');
  });

  it('tests the Quanti Tray Legiolert Lookup values', async () => {
    expect(getQtLegio(0, 1)).to.be.an('number');
    assert.equal(getQtLegio(0, 0).toString(), "<1")
    getQtLegio(0, 0).should.have.lengthOf(2); // <1
    getQtLegio(90, 6).should.equal(">2272.6");// ">2272.6"
  });
});
