import {createRule} from '../../src/rules'

import {
  onlyRealNumbers,
  onlyIntegers,
  agreedToTermsAndConditions,
  richEnough,
} from './validations.fixtures'

const createSmokeleafState = (agreed, quantity, amount) => ({agreed, quantity, amount})

export const smokeleafStateDefault = createSmokeleafState(false, null, null)
export const smokeleafValidAgeedAndQuantity = createSmokeleafState(true, '10', null)
export const smokeleafValidAgreedAndAmount = createSmokeleafState(true, null, '199.95')
export const smokeleafInvalidNotAgreed = createSmokeleafState(false, '10', '10')
export const smokeleafInvalidQuantityAndAmount = createSmokeleafState(true, '10', '10.10')
export const smokeleafInvalidQuantityIsString = createSmokeleafState(true, 'Hello', null)

const quantityOrAmountFilled = ({quantity, amount}) => {
  if (quantity === null && amount === null) {
    return 'Either quantity or amount has to be filled'
  } else if (quantity !== null && amount !== null) {
    return 'Please fill either quantity or amount, not both'
  }

  return null
}

export const smokeleafRules = {
  // '.': createRule([quantityOrAmountFilled]),
  agreed: createRule([agreedToTermsAndConditions], true),
  quantity: createRule([onlyIntegers]),
  amount: createRule([onlyRealNumbers, richEnough]),
}

export const smokeleafRulesWithOverall = {
  '.': createRule([quantityOrAmountFilled]),
  agreed: createRule([agreedToTermsAndConditions], true),
  quantity: createRule([onlyIntegers]),
  amount: createRule([onlyRealNumbers, richEnough]),
}
