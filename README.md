Formation.js
===

_Rules plus Values equals Results_

Formation.js is a simple validation engine that exposes `validate(rules: Rules, values: Values): Results` function. See type definitions below.

## Type Definitions

#### Value

`export type Value = boolean | number | string | Object | null`

`Value` is something that we might want to validate, it can be one of following types: `boolean`, `number`, `string`, `Object` or `null`. By convention `null` is used for to denote _empty_ or default values. When input field has nothing in it, or radio button is neither selected nor deselected - it‘s empty.

#### Message

`type Message = string`
`Message` is a `string`, In real life application message should be an id pointing to i18n/l10n bundle.

#### Validation
`type Validation = (value: Value) => ?Message`

`Validation` is a function that accepts `Value` and returns `Message` or `null` (_Maybe Message_).

#### Result

`type Result {value: Value, messages: Message[]}`

`Result` structure contains value and list of messages, empty list of messages means that result is _valid_.

#### Rule

`export type Rule = {validations: Validation[], defaultValue: Value, required: boolean}`

`Rule` structure contains list of validation functions, default value if any and required flag. `Rule` can be executed against `Value` to produce `Result`.

#### Rules
`type Rules = {[string]: Rule}`

`Rules` structure is a map of keys and rules.

#### Values
`type Values = {[string]: Value}`

`Values` structure is a map of keys and values.

#### Results
`type Results = {[string]: Result}`

`Results` structure is a map of keys and results

