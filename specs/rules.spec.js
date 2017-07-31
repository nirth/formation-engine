// eslint max-statements: ["error", 20]
import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import sinonChaiInOrder from 'sinon-chai-in-order'

import {createRule, shouldRuleBeInvoked, runRule} from '../src/rules'
import {resultIsValid} from '../src/results'
import {
  amountIsRequiredAndRealNumberAndLargerThan500,
  termsAndConditionsRequiredAndSigned,
  notRequiredDefaultValueOne,
  requiredDefaultValueOne,
  hasNoValidations,
  requiredRichAmount,
} from './fixtures/rules.fixtures'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(sinonChaiInOrder)

/*
  Note: I'm not sure how I feel about existense of this file. Technically it‘s good to cover code with tests,
  but at same point I'd prefer to maintain minimal test surface and only test against business requirements.

  * Arguments to delete -  Rule implementation is internal one, and can (and will) change a lot.
  * Argument to keep - It‘s a living example of how rules are created.
*/

describe('createRule funciton should', () => {
  it('exist', () => expect(createRule).to.be.a('function'))

  it('should indicate required status of the rule', () => {
    const requiredRule = createRule([], true)
    const notRequiredRule = createRule([], false)

    expect(requiredRule.required).to.be.true()
    expect(notRequiredRule.required).to.be.false()
  })
})

describe('shouldRuleBeInvoked function should', () => {
  it('exist', () => expect(shouldRuleBeInvoked).to.be.a('function'))

  it('indicate that rule should not be invoked when rule is not required, and value is same as default value', () => {
    expect(shouldRuleBeInvoked(notRequiredDefaultValueOne, '1')).to.be.false()
  })

  it('indicate that rule should not be invoked when rule has no validations', () => {
    expect(shouldRuleBeInvoked(hasNoValidations, '1')).to.be.false()
  })

  it('indicate that rule should be invoked when rule is required and have validations', () => {
    expect(shouldRuleBeInvoked(amountIsRequiredAndRealNumberAndLargerThan500, '1')).to.be.true()
    expect(shouldRuleBeInvoked(termsAndConditionsRequiredAndSigned, '1')).to.be.true()
    expect(shouldRuleBeInvoked(requiredDefaultValueOne, '2')).to.be.true()
    expect(shouldRuleBeInvoked(requiredRichAmount, '10.10')).to.be.true()
  })
})

describe('runRule function should', () => {
  it('exist', () => expect(runRule).to.be.a('function'))

  it('result in no messages and valid result when input is valid', () => {
    const agreedResult = runRule(termsAndConditionsRequiredAndSigned, true)
    
    const amountResult = runRule(amountIsRequiredAndRealNumberAndLargerThan500, '501')

    expect(resultIsValid(agreedResult)).to.be.true()
    expect(resultIsValid(amountResult)).to.be.true()
  })

  it('result in appropriate messages and invalid result when input is invalid', () => {
    const agreedResult = runRule(termsAndConditionsRequiredAndSigned, false)
    const amountResult = runRule(amountIsRequiredAndRealNumberAndLargerThan500, 'abc')
    const poorResult = runRule(requiredRichAmount, 'abc')

    expect(resultIsValid(agreedResult)).to.be.false()
    expect(agreedResult.messages).to.have.lengthOf(1)

    expect(resultIsValid(amountResult)).to.be.false()
    expect(amountResult.messages).to.have.lengthOf(2)

    expect(resultIsValid(poorResult)).to.be.false()
    expect(poorResult.messages).to.have.lengthOf(2)
  })
})
