// @flow
import type {Value, Message, Result} from './types.d'

export const createResult = (value: Value, messages: Message[] = []): Result => ({value, messages})

export const createAlwaysValidResult = (value: Value): Result => createResult(value)

export const isResultValid = (result: Result): boolean => result.messages.length === 0

export const appendMessageToResult = (result: Result, message: Message): Result => (
  createResult(result.value, result.messages.concat([message]))
)
