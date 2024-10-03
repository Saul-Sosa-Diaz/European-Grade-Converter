/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description This file containt a component to display and select a country from a TreeSelect.
 * It also calculates and displays a grade based on the selected country's grading system and a user-provided grade.
 * This component uses the context to access the grade that needs to be converted and the origin country.
 */

"use client";

import React, { useState, useContext, useEffect } from "react";
import { ToConvertContext } from "../context/to-convert-context"; // Context for sharing grade and country information globally
import { Country, COUNTRIES, findCountryByKey } from "@/src/app/lib/countries"; // Country-related utilities
import { Card } from "primereact/card"; // PrimeReact Card component for displaying the calculated grade
import CustomTreeSelect from "./customTreeSelect"; // Custom TreeSelect component for selecting countries
import "@/src/app/styles/global-theme.css"; // Global theme styles
import {
  renderOptionTemplate,
  renderSelectedItemTemplate,
} from "./treeSelectTemplates"; // Helper functions to render the TreeSelect
import { GeneralGradeConverter } from "@/src/app/lib/interfaces/i-grade-converter"; // Utility for converting grades between different countries

/**
 * CountryTreeSelectAndGradeConversed component.
 *
 * This component allows the user to:
 * - Select a destination country from a tree-based dropdown (TreeSelect).
 * - View the converted grade based on the grading system of the selected country and the grade provided in the context.
 *
 * The grade is automatically calculated whenever the user changes the destination country or the grade to convert.
 *
 * @component
 * @returns {JSX.Element} The rendered CountryTreeSelectAndGradeConversed component.
 */
const CountryTreeSelectAndGradeConversed: React.FC = () => {
  // Access the grade and origin country from the global context
  const { gradeToConvert, countryFrom } = useContext(ToConvertContext);

  // State to hold the currently selected destination country
  const [countryTo, setActualCountry] = useState<Country | null>(
    COUNTRIES.find((country) => country.code === "ES") // Default to Spain as the initial country
  );

  // State to hold the key of the selected country
  const [keyCountryTo, setCountryTo] = useState<string | null>(countryTo.key);

  // State to hold the calculated grade
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null);

  /**
   * Calculate the grade based on the selected country's grading system.
   * - If the user has selected a country and provided a grade to convert, the grade is converted.
   * - The conversion is done using the `GeneralGradeConverter` utility.
   */
  const calculateGrade = () => {
    const GRADE_CONVERSOR = new GeneralGradeConverter(); // Initialize the grade converter
    if (!gradeToConvert) {
      setCalculatedGrade(null); // Clear the calculated grade if no grade is provided
    } else if (keyCountryTo && gradeToConvert) {
      // Convert the grade based on the origin and destination countries' grading systems
      const CONVERTED_GRADE = GRADE_CONVERSOR.convert(
        gradeToConvert,
        countryFrom,
        countryTo
      );
      setCalculatedGrade(CONVERTED_GRADE); // Update the state with the converted grade
    }
  };

  // Recalculate the grade whenever the destination country, the grade to convert, or the origin country changes
  useEffect(() => {
    calculateGrade();
  }, [keyCountryTo, gradeToConvert, countryFrom, calculateGrade]);

  // Update the actual country object whenever the keyCountryTo state changes
  useEffect(() => {
    setActualCountry(findCountryByKey(keyCountryTo)); // Find and set the country by its key
  }, [keyCountryTo]);

  return (
    <div className="flex flex-column gap-3 w-20rem">
      {/* Country TreeSelect */}
      <CustomTreeSelect<Country>
        filter={true} // Enable filtering for searching countries
        value={keyCountryTo} // Currently selected country key
        onChange={(e) => setCountryTo(e.value)} // Update selected country key
        options={COUNTRIES} // List of available countries
        nodeTemplate={renderOptionTemplate} // Template to render each country option
        valueTemplate={renderSelectedItemTemplate} // Template to render the selected country
        optionLabel="label" // Display the country label as the display name
        placeholder="Select a Country" // Placeholder text for the TreeSelect dropdown
        panelFooterTemplate={() =>
          keyCountryTo ? ( // Footer template displaying the selected country
            <span>
              <b>{countryTo.label}</b> selected.
            </span>
          ) : (
            "No country selected."
          )
        }
      />

      {/* Display the calculated grade if available */}
      {calculatedGrade && (
        <div className="card w-100">
          <Card className="flex justify-content-center align-items-center">
            <p className="m-0 text-xl">{calculatedGrade}</p>{" "}
            {/* Render the calculated grade */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default CountryTreeSelectAndGradeConversed;
