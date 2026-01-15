import { expect, test } from 'vitest'
import { fn } from '../src/build'

test('fn', () => {
  expect(fn()).toBe('Hello, tsdown!')
})
