/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the SQL queries for grade conversion-related operations.
 * It defines the queries for converting grades between different evaluation systems.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the SQL queries for grade conversion-related operations.
 * @author Saul Sosa
 */

export const CONVERTER_QUERIES = {
  COUNTINUOUS_TO_SPAIN: `
     SELECT gc.MinIntervalGrade, gc.MaxIntervalGrade,
            gc.baseEquivalentSpanishGrade, gc.topEquivalentSpanishGrade
        FROM CONTINUOUS_GRADE_CONVERSION gc
            WHERE gc.evaluationSystemID = $1
			      AND ($2 BETWEEN gc.MinIntervalGrade AND gc.MaxIntervalGrade) OR ($2 BETWEEN gc.MaxIntervalGrade AND gc.MinIntervalGrade)
      ORDER BY gc.MinIntervalGrade DESC
        `,
  COUNTINUOUS_FROM_SPAIN: `
     SELECT gc.MinIntervalGrade, gc.MaxIntervalGrade,
            gc.baseEquivalentSpanishGrade, gc.topEquivalentSpanishGrade
        FROM CONTINUOUS_GRADE_CONVERSION gc
            WHERE gc.evaluationSystemID = $1
			      AND ($2 BETWEEN gc.baseEquivalentSpanishGrade AND gc.topEquivalentSpanishGrade) OR ($2 BETWEEN gc.MaxIntervalGrade AND gc.MinIntervalGrade)
      ORDER BY gc.baseEquivalentSpanishGrade DESC
        `,
  DISCRETE_TO_SPAIN: `
    SELECT dc.gradeValue, dc.baseEquivalentSpanishGrade, dc.topEquivalentSpanishGrade
            FROM DISCRETE_GRADE_CONVERSION dc
            WHERE dc.evaluationSystemID = $1
			      AND dc.gradeValue = $2
     		ORDER BY dc.baseEquivalentSpanishGrade DESC`,
  DISCRETE_FROM_SPAIN: `
    SELECT dc.gradeValue, dc.baseEquivalentSpanishGrade, dc.topEquivalentSpanishGrade
            FROM DISCRETE_GRADE_CONVERSION dc
            WHERE dc.evaluationSystemID = $1
			      AND $2 BETWEEN dc.baseEquivalentSpanishGrade 
            AND dc.topEquivalentSpanishGrade
      ORDER BY dc.baseEquivalentSpanishGrade DESC`,
}
