/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description
 * This React component allows users to select a country and its corresponding grade.
 * Depending on the selected country, the grade input may be a dropdown or a manual input field.
 * It uses a global context to share the selected country and grade with other parts of the application.
 */

"use client";

import React, { useState, useContext } from "react";
import "@/src/app/styles/card.css";
import "@/src/app/styles/global-theme.css";
import { DropdownChangeEvent } from "primereact/dropdown";
import { ToConvertContext } from "../context/to-convert-context";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Country, COUNTRIES, findCountryByKey } from "@/src/app/lib/countries";
import CustomTreeSelect from "./customTreeSelect";
import {
  renderSelectedItemTemplate,
  renderOptionTemplate,
} from "./treeSelectTemplates";

/**
 * CountryTreeSelect component.
 * This component allows users to select a country and a grade.
 *
 * - The country is selected from a tree dropdown.
 * - Depending on the country, the grade can either be manually entered or selected from a dropdown.
 * - The selected country and grade are shared via a global context (ToConvertContext) for other parts of the app.
 *
 * @component
 * @returns {JSX.Element} The rendered CountryTreeSelect component.
 */
const CountryTreeSelect: React.FC = () => {
  // State hooks
  const [selectedKeyCountry, setSelectedKeyCountry] = useState<string | null>(
    null
  ); // State for selected country key
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // State for selected country object
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null); // State for selected grade value

  // Context from ToConvertContext
  const { setGradeToConvert, setCountryFrom } = useContext(ToConvertContext); // Context for sharing grade and country globally

  /**
   * Handler function for when a country is selected from the dropdown.
   * This resets the grade selection and updates the selected country in both the local state and the global context.
   *
   * @param {DropdownChangeEvent} e - The dropdown change event containing the selected country key.
   */
  const handleCountryChange = (e: DropdownChangeEvent) => {
    const selectedKeyCountryValue = e.value;
    if (selectedKeyCountryValue) {
      const NEW_COUNTRY = findCountryByKey(selectedKeyCountryValue); // Find country object by key
      setSelectedGrade(null); // Reset selected grade in local state
      setGradeToConvert(null); // Reset grade in global context
      setSelectedKeyCountry(selectedKeyCountryValue); // Update selected country key
      console.log(NEW_COUNTRY); // Log the selected country for debugging purposes
      setSelectedCountry(NEW_COUNTRY); // Update selected country object in local state
      setCountryFrom(NEW_COUNTRY); // Update country in global context
    }
  };

  /**
   * Handler function for when a grade is selected or changed.
   * This updates the selected grade in both the local state and the global context.
   *
   * @param {DropdownChangeEvent} e - The dropdown change event containing the selected grade.
   */
  const handleGradeChange = (e: DropdownChangeEvent) => {
    const selectedGradeValue = e.value as number;
    setSelectedGrade(selectedGradeValue); // Update selected grade in local state
    setGradeToConvert(selectedGradeValue); // Update grade in global context
  };

  return (
    <div className="flex flex-column gap-3 w-20rem">
      {/* Country dropdown */}
      <CustomTreeSelect<Country>
        value={selectedKeyCountry} // The selected country key
        onChange={(e: DropdownChangeEvent) => handleCountryChange(e)} // Event handler for country change
        options={COUNTRIES} // List of countries to display in dropdown
        nodeTemplate={renderOptionTemplate} // Template for rendering country options
        valueTemplate={renderSelectedItemTemplate} // Template for rendering the selected country
        optionLabel="name" // Label to display for each country
        placeholder="Select a Country" // Placeholder text for the dropdown
        panelFooterTemplate={() =>
          // Template for footer in dropdown panel
          selectedCountry ? (
            <span>
              <b>{selectedCountry.label}</b> selected.
            </span>
          ) : (
            "No country selected."
          )
        }
        filter={true} // Enables filtering for the country dropdown
      />

      {/* Conditionally render input for grade, either number input or dropdown based on country */}
      {selectedCountry && !selectedCountry.grades && (
        <InputNumber
          value={selectedGrade ? Number(selectedGrade) : null} // The selected grade value
          onValueChange={(e) => handleGradeChange(e)} // Event handler for grade change
          min={selectedCountry.minGrade} // Minimum grade for manual input
          max={selectedCountry.maxGrade} // Maximum grade for manual input
          maxFractionDigits={selectedCountry.decimalPlaces} // Max number of decimal places allowed
          suffix={selectedCountry.suffix} // Suffix for grade (e.g., "%")
        />
      )}

      {selectedCountry && selectedCountry.grades && (
        <Dropdown
          value={selectedGrade} // The selected grade
          onChange={(e: DropdownChangeEvent) => handleGradeChange(e)} // Event handler for grade selection
          options={selectedCountry.grades} // List of grades to display in dropdown
          placeholder="Select a Grade" // Placeholder text for grade dropdown
          optionLabel="value" // Label for the grade options
        />
      )}
    </div>
  );
};

export default CountryTreeSelect;
