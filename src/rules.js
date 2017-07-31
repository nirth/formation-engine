// @flow
import {curry} from 'ramda'
import {createResult, createAlwaysValidResult} from '../src/results'
import {type Rule, type Value, type Validation, type Result, type Message} from './types.d'

export const createRule = (validations: Validation[], required: boolean = false, defaultValue: Value = null) => ({
  validations,
  required,
  defaultValue,
})

const shouldRuleBeInvoked = (rule: Rule, value: Value): boolean => {
  // TODO: This function is provisionaly naive implementation.
  if (rule.required && value === rule.defaultValue) {
    // Abort validation if field if field is _not_ required and value _is_ defaultValue
    return false
  }
  return true
})

const runRule = (rule: Rule, value: Value): Result => {
  if (!shouldRuleBeInvoked(rule, value)) {
    return createAlwaysValidResult(value)
  }

  return createResult(value, rule.validations
    // $FlowFixMe: I‘m right, flow wrong in this case.
    .map((validation: Validation): ?Message => validation(value))
    .filter((maybeMessage: ?Message): boolean => typeof maybeMessage === 'string'))
})
const curriedShouldRuleBeInvoked = curry(shouldRuleBeInvoked)
const curriedRunRule = curry(runRule)

export {
  curriedRunRule as runRule,
  curriedShouldRuleBeInvoked as shouldRuleBeInvoked,
}
