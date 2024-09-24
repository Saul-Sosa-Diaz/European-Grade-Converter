"use client"
import React, { useState, useContext } from 'react';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { GradeContext } from "../context/gradeContext";
import { InputNumber } from 'primereact/inputnumber';
import { Country, COUNTRIES } from '@/src/app/lib/countries';
import CustomDropdown from './customDropdown';
import { renderSelectedItemTemplate, renderOptionTemplate } from './dropdownTemplates';

/**
 * Component to select a country and a grade.
 */
const CountryDropdown: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // Country selection state
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null); // Grade selection state
    const { setGrade } = useContext(GradeContext); // Global context for grade selection

    /**
     * Handles grade selection and updates the context.
     */
    const handleGradeChange = (e: DropdownChangeEvent) => {

        const selectedGradeValue = e.value;
        setSelectedGrade(selectedGradeValue);

        setGrade(selectedGradeValue);
    };

    return (
      <div className="flex flex-column gap-3">
        {/* Country dropdown */}
        <CustomDropdown<Country>
          value={selectedCountry}
          onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
          options={COUNTRIES}
          optionLabel="name"
          placeholder="Select a Country"
          valueTemplate={renderSelectedItemTemplate}
          itemTemplate={renderOptionTemplate}
          panelFooterTemplate={() =>
            selectedCountry ? (
              <span>
                <b>{selectedCountry.name}</b> selected.
              </span>
            ) : (
              "No country selected."
            )
          }
        />

        {/* Grade dropdown (only shown when a country is selected) */}
        {selectedCountry && (
          <InputNumber
            value={selectedGrade}
            onValueChange={(e) => handleGradeChange(e)}
            min={selectedCountry.minGrade}
            max={selectedCountry.maxGrade}
          />
        )}
      </div>
    );
};

export default CountryDropdown;