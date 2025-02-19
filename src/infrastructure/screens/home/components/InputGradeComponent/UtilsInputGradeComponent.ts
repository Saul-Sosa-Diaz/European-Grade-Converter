/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains utility functions used in the InputGradeComponent.
 *
 * @date February 19, 2025
 * @description This file defines utility functions for the InputGradeComponent used in the home screen.
 * @author Saul Sosa
 */

/**
 * Parses a string and returns a floating point number.
 * If the string does not represent a valid floating point number, returns NaN.
 *
 * @param value - The string to parse.
 * @returns The parsed floating point number, or NaN if the string is not a valid floating point number.
 */
export function customParseFloat(value) {
  if (!/^[+-]?\d+(\.\d+)?$/.test(value)) {
    return NaN
  }
  return parseFloat(value)
}
