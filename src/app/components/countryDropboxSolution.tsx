"use client";
import React, { useState, useContext, useEffect, use } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";
import { ToConvertContext } from "../context/to-convert-context";
import { Country, COUNTRIES } from "@/src/app/lib/countries";
import { Card } from "primereact/card";
import CustomDropdown from "./customDropdown";
import {
  renderOptionTemplate,
  renderSelectedItemTemplate,
} from "./dropdownTemplates";
import { GeneralGradeConverter } from "@/src/app/lib/interfaces/i-grade-converter";

/**
 * Component to display and select a country from a dropdown.
 * It also calculates and displays a grade based on the selected country's grading system and a user grade.
 */
const CountryDropdownAndGradeConversed: React.FC = () => {
  const { gradeToConvert, countryFrom } = useContext(ToConvertContext); // Access the grade from context
  const [countryTo, setActualCountry] = useState<Country | null>(COUNTRIES.find((country) => country.code === "ES")); // Actual country state
  const [keyCountryTo, setCountryTo] = useState<string | null>(countryTo.key); // Selected country state
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null); // Calculated grade state

  // Function to calculate the grade based on the selected country's grading system
  const calculateGrade = () => {
    const GRADE_CONVERSOR = new GeneralGradeConverter();
    if (!gradeToConvert) { setCalculatedGrade(null)}
    else if (keyCountryTo && gradeToConvert) {
      // If the selected country is Spain, convert the grade to the selected country's grading system
      const CONVERTED_GRADE = GRADE_CONVERSOR.convert(
        gradeToConvert,
        countryFrom,
        countryTo
      );
      setCalculatedGrade(CONVERTED_GRADE);
    }
  };
  // Trigger grade calculation whenever keyCountryTo or grade changes
  useEffect(() => {
    calculateGrade();
  }, [keyCountryTo, gradeToConvert, countryFrom]);

  useEffect(() => {
    setActualCountry(COUNTRIES.find((country) => country.key === keyCountryTo));
  } , [keyCountryTo]);

  return (
    <div className="flex flex-column gap-3 w-15rem">
      {/* Country dropdown */}
      <CustomDropdown<string>
        filter={true}
        value={keyCountryTo}
        onChange={(e: DropdownChangeEvent) => setCountryTo(e.value)}
        options={COUNTRIES}
        nodeTemplate={renderOptionTemplate}
        valueTemplate={renderSelectedItemTemplate}
        optionLabel="label"
        placeholder="Select a Country"
        panelFooterTemplate={() =>
          keyCountryTo ? (
            <span>
              <b>{keyCountryTo}</b> selected.
            </span>
          ) : (
            "No country selected."
          )
        }
      />
      {calculatedGrade && (
        <div className="card w-100">
          <Card className="flex justify-content-center align-items-center">
            <p className="m-0 text-xl">{calculatedGrade}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CountryDropdownAndGradeConversed;
