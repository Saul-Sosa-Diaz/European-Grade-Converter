"use client";
import React, { useState, useContext } from "react";
import "@/src/app/styles/card.css";
import { DropdownChangeEvent } from "primereact/dropdown";
import { ToConvertContext } from "../context/to-convert-context";
import { InputNumber } from "primereact/inputnumber";
import { Country, COUNTRIES } from "@/src/app/lib/countries";
import CustomDropdown from "./customDropdown";
import {
  renderSelectedItemTemplate,
  renderOptionTemplate,
} from "./dropdownTemplates";

/**
 * Component to select a country and a grade.
 */
const CountryDropdown: React.FC = () => {
  const [selectedKeyCountry, setSelectedKeyCountry] = useState<string | null>(null); // key country selection state
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // Country selection state
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null); // Grade selection state
  const {setGradeToConvert, setCountryFrom } = useContext(ToConvertContext); // Global context for grade selection


  const handleCountryChange = (e: DropdownChangeEvent) => {
    const selectedCountryValue = e.value;
    if (selectedCountryValue) {
      const NEW_COUNTRY = COUNTRIES.find((country) => country.key === selectedCountryValue);
      setSelectedGrade(null);
      setGradeToConvert(null);
      setSelectedKeyCountry(selectedCountryValue);
      setSelectedCountry(NEW_COUNTRY);
      setCountryFrom(NEW_COUNTRY);
    }
    
  };

  const handleGradeChange = (e: DropdownChangeEvent) => {
    const selectedGradeValue = e.value as number;
    setSelectedGrade(selectedGradeValue);
    setGradeToConvert(selectedGradeValue);
  };

  return (
    <div className="flex flex-column gap-3 w-15rem">
      {/* Country dropdown */}
      <CustomDropdown<Country>
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
        <CustomDropdown<number>
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

export default CountryDropdown;
