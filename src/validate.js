// @flow
import {curry, mergeDeepLeft, map, values as ramdaValues, mapObjIndexed} from 'ramda'
import {type Rules, type Values, type Results, type Rule, type Value} from './types.d'
import {runRule} from './rules'

const movePropertyDeeperIntoObject = (deeperName: string, shape: any): any => map((v) => ({[deeperName]: v}), shape)

const mergeRulesAndValues = (rs: Rules, vs: Values) => mergeDeepLeft(
  movePropertyDeeperIntoObject('rule', rs),
  movePropertyDeeperIntoObject('value', vs)
)

/**
 * Function `validate` takes in `rules` and `values` and produces `results` of the validation, in effect validating entire form.
 *
 * @param {Object | Rules} rules - Set of rules that used by form to validate.
 * @param {Object | Values} values - Values of the individual inputs that should be validated.
 * @returns {Results} - Set of results after running a validation.
 */
const validate = (rules: Rules, values: Values): Results => ramdaValues(
  mapObjIndexed(
    (v: {value: Value, rule: Rule}, k) => ({name: k, rule: v.rule, value: v.value}),
    mergeRulesAndValues(rules, values)
  ))
  .reduce(
    (results, {name, rule, value}) => Object.assign({}, results, {[name]: runRule(rule, value)}),
    {}
  )

export default curry(validate)
/**
 * Validates single field against set of `rules`.
 *
 * @param {Object | Rules} rules - Set of rules that used by form to validate.
 * @param {string} field - Indicates field to be validated
 * @param {Object | Values} values - Values of the individual inputs that should be validated.
 * @returns {Result} - Results of validation.
 */
const validateSingleField = (rules: Rules, field: string, values: Values): Result => {
  // We are passing entire subset of rules instead of a single rule for two reasons:
  // * To maintain API to be somewhat similar to `validate`.
  // * As a future
  console.log('validateSingleField', rules, field, values)
  return runRule(rules[field], values[field])
}
