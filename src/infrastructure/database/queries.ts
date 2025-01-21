export const QUERIES = {
  GET_COUNTRY_LIST: `
    SELECT countryID, countryCode, countryName
    FROM COUNTRY
  `,
  UPDATE_COUNTRY: `
    UPDATE COUNTRY
    SET countryCode = $2, countryName = $3
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
      fixed
    FROM UNIVERSITY 
    JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID 
    JOIN EVALUATION_SYSTEM ON UNIVERSITY.universityID = EVALUATION_SYSTEM.universityID
  `,
  COUNTINUOUS_TO_SPAIN: `
     SELECT gc.MinIntervalGrade, gc.MaxIntervalGrade,
            gc.baseEquivalentSpanishGrade, gc.topEquivalentSpanishGrade
        FROM CONTINUOUS_GRADE_CONVERSION gc
            WHERE gc.evaluationSystemID = $1
			      AND $2 BETWEEN gc.MinIntervalGrade AND gc.MaxIntervalGrade
      ORDER BY gc.MinIntervalGrade DESC
        `,
  COUNTINUOUS_FROM_SPAIN: `
     SELECT gc.MinIntervalGrade, gc.MaxIntervalGrade,
            gc.baseEquivalentSpanishGrade, gc.topEquivalentSpanishGrade
        FROM CONTINUOUS_GRADE_CONVERSION gc
            WHERE gc.evaluationSystemID = $1
			      AND $2 BETWEEN gc.baseEquivalentSpanishGrade AND gc.topEquivalentSpanishGrade
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
