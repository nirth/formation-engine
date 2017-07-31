// eslint max-statements: ["error", 20]
import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import sinonChaiInOrder from 'sinon-chai-in-order'

import {validate, validateSingleField} from '../src/validate'
import {resultIsValid} from '../src/results'
import {
  smokeleafRules,
  smokeleafRulesRequiredAmount,
  // smokeleafStateDefault,
  // smokeleafValidAgeedAndQuantity,
  smokeleafValidAgreedAndAmount,
  // smokeleafInvalidNotAgreed,
  smokeleafInvalidQuantityAndAmount,
  // smokeleafInvalidQuantityIsString,
} from './fixtures/forms.fixtures'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(sinonChaiInOrder)

describe('validate function should', () => {
  it('exist', () => expect(validate).to.be.a('function'))

  // it('TODO describe case', () => {
  //   const validationResults = validate(smokeleafRules, smokeleafStateDefault)

  //   expect(validationResults).to.deep.equal({})
  // })

  // it('TODO describe case', () => {
  //   const validationResults = validate(smokeleafRules, smokeleafValidAgeedAndQuantity)

  //   expect(validationResults).to.deep.equal({})
  // })

  // it('TODO describe case', () => {
  //   const validationResults = validate(smokeleafRules, smokeleafValidAgreedAndAmount)

  //   expect(validationResults).to.deep.equal({})
  // })

  // it('TODO describe case', () => {
  //   const validationResults = validate(smokeleafRules, smokeleafInvalidNotAgreed)

  //   expect(validationResults).to.deep.equal({})
  // })

  // it('TODO describe case', () => {
  //   const validationResults = validate(smokeleafRules, smokeleafInvalidQuantityAndAmount)

  //   expect(validationResults).to.deep.equal({})
  // })

  // it('TODO describe case', () => {
  //   const validationResults = validate(smokeleafRules, smokeleafInvalidQuantityIsString)

  //   expect(validationResults).to.deep.equal({})
  // })
})

describe('validateSingleField function should', () => {
  it('exist', () => expect(validateSingleField).to.be.a('function'))

  it('return no messages when validating valid amount field', () => {
    const validationResult = validateSingleField(smokeleafRules, 'amount', smokeleafValidAgreedAndAmount)

    // expect(validationResult.messages).to.have.lengthOf(0)
    expect(validationResult.messages).to.deep.equal([])
    expect(resultIsValid(validationResult)).to.be.true()
  })

  it('return error messages when validating invalid amount field', () => {
    const invalidResultWithTwoMessages = validateSingleField(smokeleafRulesRequiredAmount, 'amount', smokeleafInvalidQuantityAndAmount)

    expect(invalidResultWithTwoMessages.messages).to.have.lengthOf(2)
    expect(resultIsValid(invalidResultWithTwoMessages)).to.be.false()
  })
})
