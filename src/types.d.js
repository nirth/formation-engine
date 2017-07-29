// @flow

export type Value = boolean | number | string | Object | null
export type Message = string

export type Result = {
  value: Value,
  messages: Message[],
}

export type Rule = {
  validations: Validation[],
  defaultValue: Value,
  required: boolean,
}

export type Values = {[string]: Value}
export type Results = {[string]: Result}
export type Rules = {[string]: Rule}

export type Validation = (value: Value) => ?Message
