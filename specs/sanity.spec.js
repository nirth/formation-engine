import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import sinonChaiInOrder from 'sinon-chai-in-order'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(sinonChaiInOrder)

describe('Sanity should', () => {
  it('be sane', () => {
    expect(true).equal(true)
    expect(true).not.equal(false)


    expect(false).to.equal(false)
    expect(false).not.equal(true)
  })
})
