/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the CalculatedGradeComponent.
 *
 * @date February 19, 2025
 * @description This file defines the CalculatedGradeComponent used in the home screen.
 * @author Saul Sosa
 */

import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { useEffect, useRef, useState } from "react";
import { GradeStyled, StyledCard } from "./CalculatedGradeComponent.styles";
import { useConvertGrade } from "@/hooks/converter/useConvertGrade";
import { Toast } from "primereact/toast";


export const CalculatedGradeComponent = () => {
  const { gradeToConvert, countryFrom, countryTo } = useGradeConverterContext();
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null);
  const { convertedGrade, error, isError } = useConvertGrade(
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
  const toastRef = useRef(null);
  const displayNotification = ({ message, status }: { message: string, status }) => {
    toastRef.current.show({ severity: status, detail: message, life: 3000 });
  };

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      displayNotification({ message: errorMessage, status: 'error' });
    }
  }, [isError, error]);

  useEffect(() => {
    setCalculatedGrade(null)
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
      <Toast ref={toastRef} />
    </>
  );
};
