/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the SQL queries for university-related operations.
 * It defines the queries for retrieving, updating, creating, and deleting universities.
 *
 * @date February 18, 2025
 * @description This file has the SQL queries for university-related operations.
 * @author Saul Sosa
 */

export const universityQueries = {
  GET_UNIVERSITY_LIST: `
    SELECT universityID, universityName, UNIVERSITY.countryID, COUNTRY.countryName
    FROM UNIVERSITY JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID `,
  UPDATE_UNIVERSITY:
    'UPDATE UNIVERSITY SET universityName = $2, countryID = $3 WHERE universityID = $1',
  DELETE_UNIVERSITY: 'DELETE FROM UNIVERSITY WHERE universityID = $1',
  CREATE_UNIVERSITY: 'INSERT INTO UNIVERSITY( universityName, countryID) VALUES($1, $2)',
}
