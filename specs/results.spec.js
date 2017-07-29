import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import sinonChaiInOrder from 'sinon-chai-in-order'

import {createResult, isResultValid, appendMessageToResult} from '../src/results'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(sinonChaiInOrder)

describe('createResult funciton should', () => {
  it('exist', () => expect(createResult).to.be.a('function'))

  it('create result with specific value', () => {
    const result123 = createResult(123)
    const resultXyz = createResult('xyz')

    expect(result123.value).to.equal(123)
    expect(resultXyz.value).to.equal('xyz')
  })

  it('create result with empty list of messages by default', () => {
    const result123 = createResult(123)
    const resultXyz = createResult('xyz')

    expect(result123.messages).to.have.lengthOf(0)
    expect(resultXyz.messages).to.have.lengthOf(0)
  })

  it('create result with list of messages when needed', () => {
    const messages = ['Barlogs violate health and safety policy', 'You-shall-not-pass error']
    const invalidResult = createResult('Barlog', messages)

    expect(invalidResult.value).to.equal('Barlog')
    expect(invalidResult.messages).to.have.lengthOf(messages.length)
    expect(invalidResult.messages).to.deep.equal(messages)
  })
})

describe('isResultValid funciton should', () => {
  it('exist', () => expect(isResultValid).to.be.a('function'))

  it('indicate when result is valid', () => {
    const validResult = createResult('abc')

    expect(isResultValid(validResult)).to.be.true()
  })

  it('indicate when result is invalid', () => {
    const validResult = createResult('abc', ['Value has no imagination'])

    expect(isResultValid(validResult)).to.be.false()
  })
})

describe('appendMessageToResult funciton should', () => {
  it('exist', () => expect(appendMessageToResult).to.be.a('function'))

  it('append messages to result', () => {
    const barlog = createResult('Barlog')
    const messages = ['Barlogs violate health and safety policy', 'You-shall-not-pass error']
    const [firstMessage, secondMessage] = messages
    const healthAndSafety = appendMessageToResult(barlog, firstMessage)
    const youShallNotPass = appendMessageToResult(healthAndSafety, secondMessage)
    const barlogWithMessages = youShallNotPass

    expect(barlogWithMessages.value).to.equal('Barlog')
    expect(barlogWithMessages.messages).to.have.lengthOf(2)
    expect(barlogWithMessages.messages).to.deep.equal(messages)
  })
})
