/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description This file contains the interfaces for implementing the note conversion class structure, using the strategy pattern.
 */

import { Country } from "../../fixture/countries";

/**
 * Interface for countries to force each country to switch to the Spanish system and to their own.
 * @interface
 * @function convertToSpain - Converts a grade to the Spanish system.
 * @function convertToDestinationCountry - Converts a grade to the destination country's system.
 */
export interface ICountryConverter {
  /**
   * This function converts a grade to the Spanish system.
   * @param grade - The grade to convert.
   * @returns The converted grade.
   */
  convertToSpain(grade: string): string; // Convert to Spanish system
  /**
   * This function converts a grade to the destination country's system.
   * @param grade - The grade to convert.
   * @returns The converted grade.
   */
  convertToDestinationCountry(grade: number): string; // Conevrt to destination country system
}

/**
 * Interface for the grade converter class, that forces the class to implement the function of converting.
 * @interface
 * @function convert - Converts a grade from one country to another.
 */
export interface IGradeConverter {
  /**
   * This function converts a grade from one country to another.
   * @param grade - The grade to convert.
   * @param countryFrom - The country from which the grade is converted.
   * @param countryTo - The country to which the grade is converted.
   * @returns The converted grade.
   */
  convert(grade: string, countryFrom: Country, countryTo: Country): string;
}
/**
 * The `GeneralGradeConverter` class manages the grade conversion process.
 * @class
 */
export class GeneralGradeConverter implements IGradeConverter {
  convert(grade: string, countryFrom: Country, countryTo: Country): string {
    const fromConverter = countryFrom.gradeConverter;
    const toConverter = countryTo.gradeConverter;
    grade = grade.replace(/\(.*?\)/g, "");
    grade = grade.replace(" ", "");
    const gradeInSpain = fromConverter.convertToSpain(grade); // Converting to the Spanish system
    return toConverter.convertToDestinationCountry(Number(gradeInSpain)); // Convert to the target country's system
  }
}
