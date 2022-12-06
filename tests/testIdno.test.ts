import { describe, test, expect } from '@jest/globals'
import { Validate } from '../src/index'

describe('validation', () => {
  test('checkIdNoStrict', () => {
    expect(Validate.idno.checkIdNoStrict('411424199010165951')).toBeTruthy()
  })
})
