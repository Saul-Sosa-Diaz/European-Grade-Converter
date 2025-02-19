/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date February 18 2025
 *
 * @description This file contains the route to convert a grade.
 */



import { buildContinuousGradeConvert, buildDiscreteGradeConvert } from '@/application/converter/buildGradeConvertParams';
import { continuousGradeConvert, ConverterDirection, discreteGradeConvert } from '@/domain/converter/converter';
import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { grade, fromEvaluationSystemID, toEvaluationSystemID, fixed, fromEvaluationType, toEvaluationType } = body;
    if (!grade || !fromEvaluationSystemID || !toEvaluationSystemID) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
    const databaseAdapter = createDatabaseAdapter().getDBConverterRepository();
    const conversionToSpain = await databaseAdapter.getGradeConversions({ evaluationSystemID: fromEvaluationSystemID, grade: grade, direction: ConverterDirection.toSpain, evaluationType: fromEvaluationType });

    let spainGrade;
    if (fromEvaluationType === EvaluationType.DISCRETE) {
      const params = buildDiscreteGradeConvert({ gradeConversions: conversionToSpain, direction: ConverterDirection.toSpain });
      spainGrade = await discreteGradeConvert(params);
    } else {
      const params = buildContinuousGradeConvert({ gradeConversions: conversionToSpain, grade, direction: ConverterDirection.toSpain });
      spainGrade = await continuousGradeConvert(params);
    }
    const conversionToCountryTo = await databaseAdapter.getGradeConversions({ evaluationSystemID: toEvaluationSystemID, grade: spainGrade, evaluationType: toEvaluationType });
    if (toEvaluationType === EvaluationType.DISCRETE) {
      const params = buildDiscreteGradeConvert({ gradeConversions: conversionToCountryTo });
      const result = await discreteGradeConvert(params);
      return Response.json({ convertedGrade: result, success: true }, { status: 200 });
    } else {
      const params = buildContinuousGradeConvert({ gradeConversions: conversionToCountryTo, grade: spainGrade });
      const result = await continuousGradeConvert(params);
      return Response.json({ convertedGrade: typeof result === "string" ? result : result.toFixed(fixed), success: true }, { status: 200 }); // If the result is a string it means that is a discrete grade
    }

  } catch (error) {
    return Response.json({ error: error.message, success: false }, { status: 500 });
  }
}

