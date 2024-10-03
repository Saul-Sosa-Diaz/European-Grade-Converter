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
 * Component to select a country and a grade.
 */
const CountryTreeSelect: React.FC = () => {
  const [selectedKeyCountry, setSelectedKeyCountry] = useState<string | null>(
    null
  ); // key country selection state
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // Country selection state
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null); // Grade selection state
  const { setGradeToConvert, setCountryFrom } = useContext(ToConvertContext); // Global context for grade selection

  /**
   * Handler function for changing the selected country.
   * Resets the grade selection and updates the country in both local state and global context.
   * @param e - Dropdown change event
   */
  const handleCountryChange = (e: DropdownChangeEvent) => {
    const selectedKeyCountryValue = e.value;
    if (selectedKeyCountryValue) {
      const NEW_COUNTRY = findCountryByKey(selectedKeyCountryValue); // Find the full country object by key
      setSelectedGrade(null); // Reset selected grade
      setGradeToConvert(null); // Reset global grade
      setSelectedKeyCountry(selectedKeyCountryValue); // Update selected country key
      console.log(NEW_COUNTRY); // Log the selected country for debugging
      setSelectedCountry(NEW_COUNTRY); // Update selected country object
      setCountryFrom(NEW_COUNTRY); // Set the selected country in global context
    }
  };

  /**
   * Handler function for changing the selected grade.
   * Updates the grade in both local state and global context.
   * @param e - Dropdown change event
   */
  const handleGradeChange = (e: DropdownChangeEvent) => {
    const selectedGradeValue = e.value as number;
    setSelectedGrade(selectedGradeValue);
    setGradeToConvert(selectedGradeValue);
  };

  return (
    <div className="flex flex-column gap-3 w-20rem">
      {/* Country dropdown */}
      <CustomTreeSelect<Country>
        value={selectedKeyCountry}
        onChange={(e: DropdownChangeEvent) => handleCountryChange(e)}
        options={COUNTRIES}
        nodeTemplate={renderOptionTemplate}
        valueTemplate={renderSelectedItemTemplate}
        optionLabel="name"
        placeholder="Select a Country"
        panelFooterTemplate={() =>
          selectedCountry ? (
            <span>
              <b>{selectedCountry.label}</b> selected.
            </span>
          ) : (
            "No country selected."
          )
        }
        filter={true}
      />

      {selectedCountry && !selectedCountry.grades && (
        <InputNumber
          value={selectedGrade ? Number(selectedGrade) : null}
          onValueChange={(e) => handleGradeChange(e)}
          min={selectedCountry.minGrade}
          max={selectedCountry.maxGrade}
          maxFractionDigits={selectedCountry.decimalPlaces}
          suffix={selectedCountry.suffix}
        />
      )}

      {selectedCountry && selectedCountry.grades && (
        <Dropdown
          value={selectedGrade}
          onChange={(e: DropdownChangeEvent) => handleGradeChange(e)}
          options={selectedCountry.grades}
          placeholder="Select a Grade"
          optionLabel="value"
        />
      )}
      {selectedCountry && selectedCountry.aditionalInfo && (
        <div>{selectedCountry.aditionalInfo}</div>
      )}
    </div>
  );
};

export default CountryTreeSelect;
