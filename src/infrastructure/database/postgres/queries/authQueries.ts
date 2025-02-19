/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the SQL queries for authentication-related operations.
 * It defines the queries for verifying a user and logging user activity.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the SQL queries for authentication-related operations.
 * @author Saul Sosa
 */

export const AUTH_QUERIES = {
  VERIFY_USER: 'SELECT * FROM users WHERE username = $1 AND password = crypt($2, password);',
  LOG_USER_ACTIVITY: 'INSERT INTO LOGS (username, date, operation) VALUES ($1, $2, $3);',
}
