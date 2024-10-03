/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description
 * Component to display and select a country from a TreeSelect.
 * It also calculates and displays a grade based on the selected country's grading system and a user grade.
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
 * Component to select a country and convert a grade.
 */
const CountryTreeSelectAndGradeConversed: React.FC = () => {
  const { gradeToConvert, countryFrom } = useContext(ToConvertContext); // Access the grade and origin country from global context
  const [countryTo, setActualCountry] = useState<Country | null>(
    COUNTRIES.find((country) => country.code === "ES") // Initialize with default country (Spain)
  ); // State to hold the currently selected country
  const [keyCountryTo, setCountryTo] = useState<string | null>(countryTo.key); // State to hold the key of the selected country
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null); // State to hold the calculated grade

  /**
   * Function to calculate the grade based on the selected country's grading system.
   */
  const calculateGrade = () => {
    const GRADE_CONVERSOR = new GeneralGradeConverter(); // Initialize the grade converter
    if (!gradeToConvert) {
      setCalculatedGrade(null); // If no grade is provided, clear the calculated grade
    } else if (keyCountryTo && gradeToConvert) {
      // Convert the grade based on the origin and destination countries' grading systems
      const CONVERTED_GRADE = GRADE_CONVERSOR.convert(
        gradeToConvert,
        countryFrom,
        countryTo
      );
      setCalculatedGrade(CONVERTED_GRADE); // Update the state with the calculated grade
    }
  };

  // Calculate the grade whenever the selected country or grade changes
  useEffect(() => {
    calculateGrade();
  }, [keyCountryTo, gradeToConvert, countryFrom, calculateGrade]);

  // Update the actual country object whenever the keyCountryTo changes
  useEffect(() => {
    setActualCountry(findCountryByKey(keyCountryTo)); // Find and set the country by its key
  }, [keyCountryTo]);

  return (
    <div className="flex flex-column gap-3 w-20rem">
      {/* Country TreeSelect */}
      <CustomTreeSelect<string>
        filter={true} // Enable filtering for searching countries
        value={keyCountryTo} // Currently selected country key
        onChange={(e) => setCountryTo(e.value)} // Update country selection
        options={COUNTRIES} // List of available countries
        nodeTemplate={renderOptionTemplate} // Template to render each country option
        valueTemplate={renderSelectedItemTemplate} // Template to render the selected country
        optionLabel="label" // Use the country label as the display name
        placeholder="Select a Country" // Placeholder text for the TreeSelect
        panelFooterTemplate={() =>
          keyCountryTo ? ( // Footer template displaying selected country
            <span>
              <b>{countryTo.label}</b> selected.
            </span>
          ) : (
            "No country selected."
          )
        }
      />
      {/* Display calculated grade if available */}
      {calculatedGrade && (
        <div className="card w-100">
          <Card className="flex justify-content-center align-items-center">
            <p className="m-0 text-xl">{calculatedGrade}</p>{" "}
            {/* Display the calculated grade */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default CountryTreeSelectAndGradeConversed;
