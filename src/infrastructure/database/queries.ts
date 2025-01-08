export const QUERIES = {
  GET_COUNTRIES: `
    SELECT 
      COUNTRY.countryID, 
      UNIVERSITY.universityID, 
      universityName, 
      evaluationSystemName, 
      evaluationType, 
      countryCode, 
      countryName, 
      validGrades
    FROM UNIVERSITY 
    JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID 
    JOIN EVALUATION_SYSTEM ON UNIVERSITY.universityID = EVALUATION_SYSTEM.universityID
  `,
}
