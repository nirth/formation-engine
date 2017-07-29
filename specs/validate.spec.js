import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import sinonChaiInOrder from 'sinon-chai-in-order'

import validate from '../src/validate'
import {
  smokeleafRules,
  smokeleafStateDefault,
  smokeleafValidAgeedAndQuantity,
  smokeleafValidAgreedAndAmount,
  smokeleafInvalidNotAgreed,
  smokeleafInvalidQuantityAndAmount,
  smokeleafInvalidQuantityIsString,
} from './fixtures/forms.fixtures'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(sinonChaiInOrder)

describe('validate function should', () => {
  it('exist', () => expect(validate).to.be.a('function'))

  it('TODO describe case', () => {
    const validationResults = validate(smokeleafRules, smokeleafStateDefault)

    expect(validationResults).to.deep.equal({})
  })

  it('TODO describe case', () => {
    const validationResults = validate(smokeleafRules, smokeleafValidAgeedAndQuantity)

    expect(validationResults).to.deep.equal({})
  })

  it('TODO describe case', () => {
    const validationResults = validate(smokeleafRules, smokeleafValidAgreedAndAmount)

    expect(validationResults).to.deep.equal({})
  })

  it('TODO describe case', () => {
    const validationResults = validate(smokeleafRules, smokeleafInvalidNotAgreed)

    expect(validationResults).to.deep.equal({})
  })

  it('TODO describe case', () => {
    const validationResults = validate(smokeleafRules, smokeleafInvalidQuantityAndAmount)

    expect(validationResults).to.deep.equal({})
  })

  it('TODO describe case', () => {
    const validationResults = validate(smokeleafRules, smokeleafInvalidQuantityIsString)

    expect(validationResults).to.deep.equal({})
  })
})
