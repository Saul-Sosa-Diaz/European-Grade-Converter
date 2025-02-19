/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the SQL queries for country-related operations.
 * It defines the queries for retrieving, updating, creating, and deleting countries, as well as fetching countries with evaluation information.
 *
 * @date February 18, 2025
 * @description This file has the SQL queries for country-related operations.
 * @author Saul Sosa
 */

export const COUNTRY_QUERIES = {
  GET_COUNTRY_LIST: `
    SELECT countryID, countryCode, countryName
    FROM COUNTRY
  `,
  UPDATE_COUNTRY: `
    UPDATE COUNTRY
    SET countryCode = $2, countryName = $3
    WHERE countryId = $1 
  `,
  CREATE_COUNTRY: `
    INSERT INTO COUNTRY(countryCode, countryName)
    VALUES($1, $2)
  `,
  DELETE_COUNTRY: `
    DELETE FROM COUNTRY
    WHERE countryId = $1
  `,
  GET_COUNTRY_WITH_EVALUATION_INFO_LIST: `
    SELECT 
      COUNTRY.countryID, 
      UNIVERSITY.universityID, 
      universityName, 
      evaluationSystemName, 
      evaluationType, 
      evaluationSystemID,
      countryCode, 
      countryName, 
      validGrades,
      fixed,
      evaluationSystemInfo,
      urlToEvidence
    FROM UNIVERSITY 
    JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID 
    JOIN EVALUATION_SYSTEM ON UNIVERSITY.universityID = EVALUATION_SYSTEM.universityID
  `,
}
