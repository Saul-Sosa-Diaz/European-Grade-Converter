export const evaluationSystemQueries = {
  GET_EVALUATION_SYSTEM_LIST: `
    SELECT evaluationsystemid, EVALUATION_SYSTEM.universityid, UNIVERSITY.universityname, evaluationtype, validgrades, evaluationsystemname, fixed 
    FROM EVALUATION_SYSTEM JOIN UNIVERSITY ON EVALUATION_SYSTEM.universityid = UNIVERSITY.universityid
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
