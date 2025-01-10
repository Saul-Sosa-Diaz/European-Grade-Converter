export const QUERIES = {
  GET_COUNTRIES: `
    SELECT 
      COUNTRY.countryID, 
      UNIVERSITY.universityID, 
      universityName, 
      evaluationSystemName, 
      evaluationType, 
      evaluationSystemID,
      countryCode, 
      countryName, 
      validGrades
    FROM UNIVERSITY 
    JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID 
    JOIN EVALUATION_SYSTEM ON UNIVERSITY.universityID = EVALUATION_SYSTEM.universityID
  `,
  CALCULATE_GRADE: `
    SELECT gc.MinIntervalGrade, gc.MaxIntervalGrade,
            gc.baseEquivalentSpanishGrade, gc.topEquivalentSpanishGrade
            FROM GRADE_CONVERSION gc
            WHERE gc.evaluationSystemID = $1
			AND $2 BETWEEN gc.MinIntervalGrade AND gc.MaxIntervalGrade;
        `,
}
