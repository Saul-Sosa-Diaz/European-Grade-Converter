import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { EvaluationType } from "@/domain/evaluationSystem/evaluationSystem";
import { customParseFloat } from "@/lib/utils";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

// TODO: DO THIS WITH DEBOUNCE
export const InputGrade = () => {
  const { countryFrom, setGradeToConvert } = useGradeConverterContext(); // Context for sharing grade and country globally
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null); // State for selected grade value
  const [invalidGrade, setInvalidGrade] = useState<boolean>(false); // State for invalid grade input
  const [inputtext, setInputText] = useState<string>("");

  const handleGradeChange = (
    e: DropdownChangeEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    let selectedGradeValue = "value" in e ? e.value : e.target.value;
    setInputText(selectedGradeValue);
    if (countryFrom.evaluationType === EvaluationType.CONTINUOUS) { // TODO: Refactor this
      selectedGradeValue = selectedGradeValue.replace(" ", "");
      selectedGradeValue = selectedGradeValue.replace(",", ".");
      selectedGradeValue = selectedGradeValue.replace(
        countryFrom.suffix,
        ""
      );
      const parseGradeValue = String(customParseFloat(selectedGradeValue));
      if (parseGradeValue !== "NaN") {
        selectedGradeValue = parseGradeValue;
      }
      if (
        countryFrom.validGrades.find(
          (grade) => grade === String(selectedGradeValue)
        )
      ) {
        setInvalidGrade(false);
        setSelectedGrade(selectedGradeValue); // Update selected grade in local state
        setGradeToConvert(selectedGradeValue); // Update grade in global context
      } else if (!selectedGradeValue) {
        setSelectedGrade(null);
        setInvalidGrade(false);
        setGradeToConvert(null);
      } else {
        setInvalidGrade(true);
        setSelectedGrade(null); // Update selected grade in local state
        setGradeToConvert(null); // Update grade in global context
      }
    } else {
      setSelectedGrade(selectedGradeValue); // Update selected grade in local state
      setGradeToConvert(selectedGradeValue); // Update grade in global context
    }
  };

  useEffect(() => {
    setInputText("");
    setInvalidGrade(false);
    setSelectedGrade(null);
    setGradeToConvert(null);
  }, [countryFrom]);
  return (
    <>
      {
        countryFrom && countryFrom.evaluationType === EvaluationType.DISCRETE && (
          <Dropdown
            value={selectedGrade} // The selected grade value
            onChange={(e: DropdownChangeEvent) => handleGradeChange(e)} // Event handler for grade selection
            options={countryFrom.validGrades} // List of grades to display in dropdown
            placeholder="Select a Grade" // Placeholder text for grade dropdown
            optionLabel="value" // Label for the grade options
          />
        )
      }
      {
        countryFrom &&
        countryFrom.validGrades &&
        countryFrom.evaluationType === EvaluationType.CONTINUOUS && (
          <InputText
            value={inputtext}
            invalid={invalidGrade} // Invalid state for grade input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleGradeChange(e)
            } // Event handler for grade selection
            placeholder="Select a Grade" // Placeholder text for grade dropdown
          />
        )
      }
    </>
  );
};


