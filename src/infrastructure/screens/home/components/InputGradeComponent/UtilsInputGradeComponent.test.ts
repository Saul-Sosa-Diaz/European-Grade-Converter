/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the unit tests for the utility functions used in the InputGradeComponent.
 *
 * @date February 19, 2025
 * @description This file defines the unit tests for the utility functions used in the InputGradeComponent in the home screen.
 * @author Saul Sosa
 */

import { customParseFloat } from './UtilsInputGradeComponent'

describe('customParseFloat', () => {
  test('parses valid float string', () => {
    expect(customParseFloat('123.45')).toBe(123.45)
  })

  test('parses valid integer string', () => {
    expect(customParseFloat('123')).toBe(123)
  })

  test('parses valid negative float string', () => {
    expect(customParseFloat('-123.45')).toBe(-123.45)
  })

  test('parses valid negative integer string', () => {
    expect(customParseFloat('-123')).toBe(-123)
  })

  test('returns NaN for invalid string', () => {
    expect(customParseFloat('abc')).toBeNaN()
  })

  test('returns NaN for empty string', () => {
    expect(customParseFloat('')).toBeNaN()
  })

  test('returns NaN for string with multiple dots', () => {
    expect(customParseFloat('123.45.67')).toBeNaN()
  })

  test('returns NaN for string with letters and numbers', () => {
    expect(customParseFloat('123abc')).toBeNaN()
  })
})
