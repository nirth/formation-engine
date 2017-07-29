// @flow
import {curry} from 'ramda'
import {createResult, createAlwaysValidResult} from '../src/results'
import {type Rule, type Value, type Validation, type Result, type Message} from './types.d'

export const createRule = (validations: Validation[], required: boolean = false, defaultValue: Value = null) => ({
  validations,
  required,
  defaultValue,
})

export const shouldRuleBeInvoked = curry((rule: Rule, value: Value): boolean => {
  // TODO: This function is provisionaly naive implementation.
  if (rule.required && value === rule.defaultValue) {
    // Abort validation if field if field is _not_ required and value _is_ defaultValue
    return false
  }
  return true
})

export const runRule = curry((rule: Rule, value: Value): Result => {
  if (!shouldRuleBeInvoked(rule, value)) {
    return createAlwaysValidResult(value)
  }

  return createResult(value, rule.validations
    // $FlowFixMe: I‘m right, flow wrong in this case.
    .map((validation: Validation): ?Message => validation(value))
    .filter((maybeMessage: ?Message): boolean => typeof maybeMessage === 'string'))
})
