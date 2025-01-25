export const countryQueries = {
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
      fixed
    FROM UNIVERSITY 
    JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID 
    JOIN EVALUATION_SYSTEM ON UNIVERSITY.universityID = EVALUATION_SYSTEM.universityID
  `}