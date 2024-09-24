"use client";
import React, { useState, useContext, useEffect } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";
import { ToConvertContext } from "../context/to-convert-context";
import { Country, COUNTRIES } from "@/src/app/lib/countries";
import CustomDropdown from "./customDropdown";
import {
  renderSelectedItemTemplate,
  renderOptionTemplate,
} from "./dropdownTemplates";
import { GeneralGradeConverter } from "@/src/app/lib/interfaces/i-grade-converter";

/**
 * Component to display and select a country from a dropdown.
 * It also calculates and displays a grade based on the selected country's grading system and a user grade.
 */
const CountryDropdownAndGradeConversed: React.FC = () => {
  const { gradeToConvert, countryFrom } =
    useContext(ToConvertContext); // Access the grade from context
  const [countryTo, setCountryTo] = useState<Country | null>(null); // Selected country state
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null); // Calculated grade state

  // Function to calculate the grade based on the selected country's grading system
  const calculateGrade = () => {
    const GRADE_CONVERSOR = new GeneralGradeConverter();
    if (!gradeToConvert) { setCalculatedGrade(null)}
    else if (countryTo && gradeToConvert) {
      // If the selected country is Spain, convert the grade to the selected country's grading system
      const CONVERTED_GRADE = GRADE_CONVERSOR.convert(
        gradeToConvert,
        countryFrom,
        countryTo
      );
      setCalculatedGrade(CONVERTED_GRADE);
    }
  };

  // Trigger grade calculation whenever countryTo or grade changes
  useEffect(() => {
    calculateGrade();
  }, [countryTo, gradeToConvert, countryFrom]);

  return (
    <div className="flex flex-column gap-3">
      {/* Country dropdown */}
      <CustomDropdown<Country>
        value={countryTo}
        onChange={(e: DropdownChangeEvent) => setCountryTo(e.value)}
        options={COUNTRIES}
        optionLabel="name"
        placeholder="Select a Country"
        valueTemplate={renderSelectedItemTemplate}
        itemTemplate={renderOptionTemplate}
        panelFooterTemplate={() =>
          countryTo ? (
            <span>
              <b>{countryTo.name}</b> selected.
            </span>
          ) : (
            "No country selected."
          )
        }
      />
      {calculatedGrade && <div>{calculatedGrade}</div>}
    </div>
  );
};

export default CountryDropdownAndGradeConversed;
