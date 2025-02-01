export const evaluationSystemQueries = {
  GET_EVALUATION_SYSTEM_LIST: `
    SELECT evaluationsystemid, EVALUATION_SYSTEM.universityid, UNIVERSITY.universityname, evaluationtype, validgrades, evaluationsystemname, fixed 
    FROM EVALUATION_SYSTEM JOIN UNIVERSITY ON EVALUATION_SYSTEM.universityid = UNIVERSITY.universityid
    `,
  GET_CONTINUOUS_GRADE_CONVERSION_LIST_BY_EVALUATION_ID: `
    SELECT gradeconversionid, evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, baseEquivalentSpanishGrade, topEquivalentSpanishGrade, gradeName
    FROM CONTINUOUS_GRADE_CONVERSION
    WHERE evaluationSystemID = $1 ORDER BY BaseEquivalentSpanishGrade
    `,
  GET_DISCRETE_GRADE_CONVERSION_LIST_BY_EVALUATION_ID: ` 
  SELECT discreteGradeID as gradeconversionid, evaluationSystemID,gradeValue, baseEquivalentSpanishGrade, topEquivalentSpanishGrade
    FROM DISCRETE_GRADE_CONVERSION
    WHERE evaluationSystemID = $1 ORDER BY BaseEquivalentSpanishGrade`,
  UPDATE_EVALUATION_SYSTEM: `
    UPDATE EVALUATION_SYSTEM SET evaluationsystemname = $1, universityID = $2, validgrades = $3, evaluationtype = $4, fixed = $5
    WHERE evaluationsystemid = $6`,
  UPDATE_CONTINUOUS_GRADE_CONVERSION: `
  UPDATE CONTINUOUS_GRADE_CONVERSION SET MinIntervalGrade = $1, MaxIntervalGrade = $2, gradeName = $3, baseEquivalentSpanishGrade = $4, topEquivalentSpanishGrade = $5
  WHERE gradeconversionid = $6`,
  DELETE_EVALUATION_SYSTEM: `
    DELETE FROM EVALUATION_SYSTEM WHERE evaluationsystemid = $1`,
  CREATE_EVALUATION_SYSTEM: `
  INSERT INTO EVALUATION_SYSTEM (evaluationsystemname, universityID, validgrades, evaluationtype, fixed)
  VALUES ($1, $2, $3, $4, $5) RETURNING evaluationsystemid`,
  CREATE_CONTINUOUS_GRADE_CONVERSION: `
  INSERT INTO CONTINUOUS_GRADE_CONVERSION (evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, gradeName, baseEquivalentSpanishGrade, topEquivalentSpanishGrade)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING gradeconversionid`,
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
