export const EVALUATION_SYSTEM_QUERIES = {
  GET_EVALUATION_SYSTEM_LIST: `
    SELECT evaluationsystemid, EVALUATION_SYSTEM.universityid, UNIVERSITY.universityname, evaluationtype, validgrades, evaluationsystemname, fixed, evaluationsysteminfo, urltoevidence 
    FROM EVALUATION_SYSTEM JOIN UNIVERSITY ON EVALUATION_SYSTEM.universityid = UNIVERSITY.universityid
    `,
  GET_CONTINUOUS_GRADE_CONVERSION_LIST_BY_EVALUATION_ID: `
    SELECT gradeconversionid, evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, baseEquivalentSpanishGrade, topEquivalentSpanishGrade, gradeName, europeanEquivalence
    FROM CONTINUOUS_GRADE_CONVERSION
    WHERE evaluationSystemID = $1 ORDER BY BaseEquivalentSpanishGrade
    `,
  GET_DISCRETE_GRADE_CONVERSION_LIST_BY_EVALUATION_ID: ` 
  SELECT discreteGradeID as gradeconversionid, evaluationSystemID,gradeValue, baseEquivalentSpanishGrade, topEquivalentSpanishGrade, europeanEquivalence
    FROM DISCRETE_GRADE_CONVERSION
    WHERE evaluationSystemID = $1 ORDER BY BaseEquivalentSpanishGrade`,
  UPDATE_EVALUATION_SYSTEM: `
    UPDATE EVALUATION_SYSTEM SET evaluationsystemname = $1, universityID = $2, validgrades = $3, evaluationtype = $4, fixed = $5, evaluationsysteminfo = $6, urltoevidence = $7
    WHERE evaluationsystemid = $8`,
  UPDATE_CONTINUOUS_GRADE_CONVERSION: `
  UPDATE CONTINUOUS_GRADE_CONVERSION SET MinIntervalGrade = $1, MaxIntervalGrade = $2, gradeName = $3, baseEquivalentSpanishGrade = $4, topEquivalentSpanishGrade = $5
  WHERE gradeconversionid = $6`,
  UPDATE_DISCRETE_GRADE_CONVERSION: `
  UPDATE DISCRETE_GRADE_CONVERSION SET gradeValue = $1, baseEquivalentSpanishGrade = $2, topEquivalentSpanishGrade = $3
  WHERE discreteGradeID = $4`,
  DELETE_EVALUATION_SYSTEM: `
    DELETE FROM EVALUATION_SYSTEM WHERE evaluationsystemid = $1`,
  DELETE_CONTINUOUS_GRADE_CONVERSION: `
    DELETE FROM CONTINUOUS_GRADE_CONVERSION WHERE evaluationsystemid = $1`,
  DELETE_DISCRETE_GRADE_CONVERSION: `
    DELETE FROM DISCRETE_GRADE_CONVERSION WHERE evaluationsystemid = $1`,
  CREATE_EVALUATION_SYSTEM: `
  INSERT INTO EVALUATION_SYSTEM (evaluationsystemname, universityID, validgrades, evaluationtype, fixed, evaluationsysteminfo, urltoevidence)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING evaluationsystemid`,
  CREATE_CONTINUOUS_GRADE_CONVERSION: `
  INSERT INTO CONTINUOUS_GRADE_CONVERSION (evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, gradeName, baseEquivalentSpanishGrade, topEquivalentSpanishGrade, europeanEquivalence)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING gradeconversionid`,
  CREATE_DISCRETE_GRADE_CONVERSION: `
  INSERT INTO DISCRETE_GRADE_CONVERSION (evaluationSystemID, gradeValue, baseEquivalentSpanishGrade, topEquivalentSpanishGrade, europeanEquivalence)
  VALUES ($1, $2, $3, $4, $5) RETURNING discreteGradeID`,
 
}
