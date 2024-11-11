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

import React, { useState, useEffect } from "react";
import CustomTreeSelect from "./customTreeSelect"; // Custom TreeSelect component for selecting countries
import "@/src/styles/global-theme.css"; // Global theme styles
import {
  renderOptionTemplate,
  renderSelectedItemTemplate,
} from "./treeSelectTemplates"; // Helper functions to render the TreeSelect
import { Country } from "@/src/domain/countries/country";
import { COUNTRIES, findCountryByKey } from "@/src/infrastructure/fixture/countries";
import { CalculatedGradeComponent } from "./calculatedGradeComponent/calculatedGradeComponent";
import { useGradeConverterContext } from "@/src/context/GradeConverterContext";

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
export const CountryTreeSelectAndGradeConversed  = () => {
  const { setCountryTo, countryTo } = useGradeConverterContext(); // Access the global context to set the destination country

  // State to hold the key of the selected country
  const [keyCountryTo, setKeyCountryTo] = useState<string | null>(
    COUNTRIES.find((country) => country.code === "ES").key
  );


  // Update the actual country object whenever the keyCountryTo state changes
  useEffect(() => {
    const NEW_COUNTRY = findCountryByKey(keyCountryTo); // Find the country by its key
    setCountryTo(NEW_COUNTRY); // Update the destination country in the global context
  }, [keyCountryTo]);

  const updateKeyCountryTo = (e) => {
    if (e.value) {
      setKeyCountryTo(e.value);
    }
  };
  return (
    <div className="flex flex-column gap-3 w-20rem">
      <CustomTreeSelect<Country>
        filter={true} // Enable filtering for searching countries
        value={keyCountryTo} // Currently selected country key
        onChange={(e) => {
          updateKeyCountryTo(e);
        }} // Update selected country key
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
      <CalculatedGradeComponent />
    </div>
  );
};

export default CountryTreeSelectAndGradeConversed;
