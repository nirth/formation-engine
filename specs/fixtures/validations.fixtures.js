import {createRule} from '../../src/rules'

const integersRe = /^([0-9]+)$/
const realsNumbersRe = /^([0-9.]+)$/

export const TERMS_AND_CONDITIONS_ERROR = 'You have to agree to terms and condition and wave your human rights'
export const agreedToTermsAndConditions = (value) => (value === true ? null : TERMS_AND_CONDITIONS_ERROR)

export const NOT_AN_INTEGER_ERROR = 'Has to be integer (whole number) we don‘t know how to round'
export const onlyIntegers = (value) => (integersRe.test(value) ? null : NOT_AN_INTEGER_ERROR)

export const NOT_A_REAL_NUMBER_ERROR = 'Has to be a real number, are you imagining something? (pun intended)'
export const onlyRealNumbers = (value) => (realsNumbersRe.test(value) ? null : NOT_A_REAL_NUMBER_ERROR)

export const TOO_POOR_ERROR = 'You are too poor to be talking to us'
export const richEnough = (min) => (value) => {
  const valueAsNumber = parseFloat(value, 10)
  const safeNumbericValue = isNaN(valueAsNumber) ? 0 : valueAsNumber

  if (safeNumbericValue < min) {
    return TOO_POOR_ERROR
  }

  return null
}

export const YOU_SHALL_NOT_PASS_ERROR = 'You shall not pass this validation'
export const alwaysFail = () => YOU_SHALL_NOT_PASS_ERROR
export const alwaysPass = () => null

export const alwaysPassingValidation = createRule([alwaysPass])
export const alwaysFailingValidation = createRule([alwaysPass, alwaysFail])
export const requiredNumericValidation = createRule([onlyRealNumbers])
