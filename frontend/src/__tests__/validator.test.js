import { isNumber } from '../utils/validator'

describe('validator.js', () => {
  describe('isNumber(a: any)', () => {
    test('should return true when received number type argument.', () => {
      expect(isNumber(1)).toBe(true)
    })

    test('should return false when received other type argument.', () => {
      expect(isNumber('1')).toBe(false)
      expect(isNumber([])).toBe(false)
    })
  })
})
