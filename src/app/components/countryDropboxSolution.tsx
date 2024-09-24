"use client"
import React, { useState, useContext, useEffect } from 'react';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { GradeContext } from "../context/gradeContext";
import { Country, COUNTRIES } from '@/src/app/lib/countries';
import CustomDropdown from './customDropdown';
import { renderSelectedItemTemplate, renderOptionTemplate } from './dropdownTemplates';

/**
 * Component to display and select a country from a dropdown.
 * It also calculates and displays a grade based on the selected country's grading system and a user grade.
 */
const CountryDropdownAndGradeConversed: React.FC = () => {
    const { grade } = useContext(GradeContext); // Access the grade from context
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // Selected country state
    const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null); // Calculated grade state

    // Function to calculate the grade based on the selected country's grading system
    const calculateGrade = () => {
        console.log('Calculating grade...', grade);
        // Calculate the grade based on the selected country's grading system
        if (selectedCountry && grade) {
            let calculatedGrade;
            switch (selectedCountry.name) {
              case 'France': 
                calculatedGrade = (grade * 2).toString();
                setCalculatedGrade(calculatedGrade);
                break;
              case 'Denmark':
                if (grade >= 9) {
                    calculatedGrade = '12';
                } else if (grade >= 8) {
                    calculatedGrade = '10';
                } else if (grade >= 7)  {
                  calculatedGrade = "7";
                } else if (grade >= 6) {
                    calculatedGrade = "4";
                } else if (grade >= 5) {
                    calculatedGrade = "2";
                } else {
                    calculatedGrade = "0";
                }
                        
                setCalculatedGrade(calculatedGrade);
                break;
        }
      };
    };

    // Trigger grade calculation whenever selectedCountry or grade changes
    useEffect(() => {
        calculateGrade();
    }, [selectedCountry, grade]);

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
                selectedCountry ? <span><b>{selectedCountry.name}</b> selected.</span> : 'No country selected.'
            }
        />
            {calculatedGrade && <div>{calculatedGrade}</div>}
        </div>
    );
};

export default CountryDropdownAndGradeConversed;
