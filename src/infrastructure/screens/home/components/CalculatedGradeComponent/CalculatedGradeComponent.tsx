import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { useState } from "react";
import { GradeStyled, StyledCard } from "./CalculatedGradeComponent.styles";
import { useConvertGrade } from "@/hooks/useConvertGrade";

export const CalculatedGradeComponent = () => {
  // Access the grade and origin country from the global context
  const { gradeToConvert, countryFrom, countryTo } = useGradeConverterContext();
  // State to hold the calculated grade
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null);
  const { convertGrade } = useConvertGrade({});
  // const calculateGrade = useCallback(() => {
  //     const GRADE_CONVERSOR = new GeneralGradeConverter(); // Initialize the grade converter
  //     if (!gradeToConvert) {
  //         setCalculatedGrade(null); // Clear the calculated grade if no grade is provided
  //     } else if (gradeToConvert) {
  //         // Convert the grade based on the origin and destination countries' grading systems
  //         const CONVERTED_GRADE = GRADE_CONVERSOR.convert(
  //             gradeToConvert,
  //             countryFrom,
  //             countryTo
  //         );
  //         setCalculatedGrade(CONVERTED_GRADE); // Update the state with the converted grade
  //     }
  // }, [gradeToConvert, countryFrom, countryTo]);

  // useEffect(() => {
  //     calculateGrade();
  // }, [calculateGrade]);

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
