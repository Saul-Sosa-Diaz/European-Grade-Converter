"use client";
import React, { useState, useContext } from "react";
import "@/src/app/styles/card.css";
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

  const handleCountryChange = (e: DropdownChangeEvent) => {
    const selectedKeyCountryValue = e.value;
    if (selectedKeyCountryValue) {
      const NEW_COUNTRY = findCountryByKey(selectedKeyCountryValue);
      setSelectedGrade(null);
      setGradeToConvert(null);
      setSelectedKeyCountry(selectedKeyCountryValue);
      console.log(NEW_COUNTRY);
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
