import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { useEffect, useState } from "react";
import { GradeStyled, StyledCard } from "./CalculatedGradeComponent.styles";
import { useConvertGrade } from "@/hooks/evaluationSystem/useConvertGrade";

export const CalculatedGradeComponent = () => {
  const { gradeToConvert, countryFrom, countryTo } = useGradeConverterContext();
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null);
  const { convertedGrade } = useConvertGrade(
    countryFrom && countryFrom.evaluationSystemID
      ? {
        fromEvaluationSystemID: countryFrom.evaluationSystemID,
        toEvaluationSystemID: countryTo.evaluationSystemID,
        grade: gradeToConvert,
        fixed: String(countryTo.fixed),
        fromEvaluationType: countryFrom.evaluationType,
        toEvaluationType: countryTo.evaluationType,
      }
      : { fromEvaluationSystemID: null, toEvaluationSystemID: null, grade: null, fixed: "", fromEvaluationType: null, toEvaluationType: null }
  );

  useEffect(() => {
    if (!gradeToConvert) {
      setCalculatedGrade(null)
    }
  }, [gradeToConvert]);

  useEffect(() => {
    if (!countryFrom) return;
    const newGrade = convertedGrade;
    if (newGrade) {
      setCalculatedGrade(newGrade);
    }
  }, [convertedGrade, countryFrom]);

  return (
    <>
      {calculatedGrade && (
        <StyledCard>
          <GradeStyled>{calculatedGrade}</GradeStyled>{" "}
        </StyledCard>
      )}
    </>
  );
};
