import { describe, test, expect } from '@jest/globals'
import { Base } from '../src/index'

describe('base', () => {
  test('getDataType', () => {
    expect(Base.getTypeOf([1, 2])).toBe('Array')
    expect(Base.getTypeOf({})).toBe('Object')
    expect(Base.getTypeOf(1)).toBe('Number')
    expect(Base.getTypeOf('a')).toBe('String')
    expect(Base.getTypeOf(true)).toBe('Boolean')
    expect(Base.getTypeOf(null)).toBe('Null')
    expect(Base.getTypeOf(undefined)).toBe('Undefined')
    expect(Base.getTypeOf(() => {})).toBe('Function')
    expect(Base.getTypeOf(new Date())).toBe('Date')
    expect(Base.getTypeOf(/w+/)).toBe('RegExp')
  })
})
