"use client";
import React, { useState, useContext, useEffect } from "react";
import { ToConvertContext } from "../context/to-convert-context";
import { Country, COUNTRIES, findCountryByKey } from "@/src/app/lib/countries";
import { Card } from "primereact/card";
import CustomTreeSelect from "./customTreeSelect";
import {
  renderOptionTemplate,
  renderSelectedItemTemplate,
} from "./treeSelectTemplates";
import { GeneralGradeConverter } from "@/src/app/lib/interfaces/i-grade-converter";

/**
 * Component to display and select a country from a TreeSelect.
 * It also calculates and displays a grade based on the selected country's grading system and a user grade.
 */
const CountryTreeSelectAndGradeConversed: React.FC = () => {
  const { gradeToConvert, countryFrom } = useContext(ToConvertContext); // Access the grade from context
  const [countryTo, setActualCountry] = useState<Country | null>(
    COUNTRIES.find((country) => country.code === "ES")
  ); // Actual country state
  const [keyCountryTo, setCountryTo] = useState<string | null>(countryTo.key); // Selected country state
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null); // Calculated grade state

  // Function to calculate the grade based on the selected country's grading system
  const calculateGrade = () => {
    const GRADE_CONVERSOR = new GeneralGradeConverter();
    if (!gradeToConvert) {
      setCalculatedGrade(null);
    } else if (keyCountryTo && gradeToConvert) {
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
  }, [keyCountryTo, gradeToConvert, countryFrom, calculateGrade]);

  useEffect(() => {
    setActualCountry(findCountryByKey(keyCountryTo));
  }, [keyCountryTo]);

  return (
    <div className="flex flex-column gap-3 w-20rem">
      {/* Country TreeSelect */}
      <CustomTreeSelect<string>
        filter={true}
        value={keyCountryTo}
        onChange={(e) => setCountryTo(e.value)}
        options={COUNTRIES}
        nodeTemplate={renderOptionTemplate}
        valueTemplate={renderSelectedItemTemplate}
        optionLabel="label"
        placeholder="Select a Country"
        panelFooterTemplate={() =>
          keyCountryTo ? (
            <span>
              <b>{countryTo.label}</b> selected.
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

export default CountryTreeSelectAndGradeConversed;
