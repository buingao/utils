import { describe, test, expect } from '@jest/globals'
import { UrlHandler } from '../src/index'

describe('validation', () => {
  test('checkIdNoStrict', () => {
    expect(
      UrlHandler.obj2queryParams({ name: 'gornin', age: 100, score: undefined })
    ).toBe('name=gornin&age=100')
  })
})
