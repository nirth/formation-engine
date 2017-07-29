// @flow
import {curry, mergeDeepLeft, map, values as ramdaValues, mapObjIndexed} from 'ramda'
import {type Rules, type Values, type Results, type Rule, type Value} from './types.d'
import {runRule} from './rules'

const movePropertyDeeperIntoObject = (deeperName: string, shape: any): any => map((v) => ({[deeperName]: v}), shape)

const mergeRulesAndValues = (rs: Rules, vs: Values) => mergeDeepLeft(
  movePropertyDeeperIntoObject('rule', rs),
  movePropertyDeeperIntoObject('value', vs)
)

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
