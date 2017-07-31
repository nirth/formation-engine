import {createRule} from '../../src/rules'

import {
  onlyRealNumbers,
  onlyIntegers,
  agreedToTermsAndConditions,
  richEnough,
} from './validations.fixtures'

export const amountIsRequiredAndRealNumberAndLargerThan500 = createRule(
  [onlyRealNumbers, richEnough(500)],
  true
)

export const termsAndConditionsRequiredAndSigned = createRule(
  [agreedToTermsAndConditions], true, false
)

export const notRequiredDefaultValueOne = createRule([onlyIntegers], false, '1')
export const requiredDefaultValueOne = createRule([onlyIntegers], true, '1')
export const hasNoValidations = createRule([], false, '1')
export const hasValidations = createRule([onlyIntegers], false, '1')
export const requiredRichAmount = createRule([onlyRealNumbers, richEnough], true)
