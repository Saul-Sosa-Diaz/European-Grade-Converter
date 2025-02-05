export const universityQueries = {
  GET_UNIVERSITY_LIST: `
    SELECT universityID, universityName, UNIVERSITY.countryID, COUNTRY.countryName
    FROM UNIVERSITY JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID `,
  UPDATE_UNIVERSITY:
    'UPDATE UNIVERSITY SET universityName = $2, countryID = $3 WHERE universityID = $1',
  DELETE_UNIVERSITY: 'DELETE FROM UNIVERSITY WHERE universityID = $1',
  CREATE_UNIVERSITY: 'INSERT INTO UNIVERSITY( universityName, countryID) VALUES($1, $2)',
}
