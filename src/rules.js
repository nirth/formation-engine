// @flow
import {curry} from 'ramda'
import {createResult, createAlwaysValidResult} from '../src/results'
import {type Rule, type Value, type Validation, type Result, type Message} from './types.d'

export const createRule = (validations: Validation[], required: boolean = false, defaultValue: Value = null) => ({
  validations,
  required,
  defaultValue,
})

const hasNoValidations = (validations) => (!Array.isArray(validations) || validations.length === 0)
const valueNotRequiredAndSameAsDefault = (value: Value, defaultValue: Value, required: boolean) => (
  !required && value === defaultValue
)

const shouldRuleBeInvoked = (rule: Rule, value: Value): boolean => {
  // TODO: This function is provisionaly naive implementation.

  if (valueNotRequiredAndSameAsDefault(value, rule.defaultValue, rule.required) || // Abort validation if field if field is _not_ required and value _is_ defaultValue
      hasNoValidations(rule.validations) // Rule has no validations, there is nothing to do with it, even if it is required.
  ) {
    return false
  }

  return true
}

const safeInvokeAndReturnValidationResult = (validation: Validation, value: Value): ?Message => {
  const result = validation(value)

  if (typeof result === 'string' || result === null) {
    return result
  }

  throw new Error(
    `runRule: Result of validation can either be a Message, string or null, instead received ${String(result)} of type ${typeof result}`
  )
}
const runRule = (rule: Rule, value: Value): Result => {
  if (!shouldRuleBeInvoked(rule, value)) {
    return createAlwaysValidResult(value)
  }

  return createResult(value, rule.validations
    // $FlowFixMe: I‘m right, flow wrong in this case.
    .map((validation: Validation): ?Message => validation(value))
    .filter((maybeMessage: ?Message): boolean => typeof maybeMessage === 'string'))
}

const curriedShouldRuleBeInvoked = curry(shouldRuleBeInvoked)
const curriedRunRule = curry(runRule)

export {
  curriedRunRule as runRule,
  curriedShouldRuleBeInvoked as shouldRuleBeInvoked,
}
