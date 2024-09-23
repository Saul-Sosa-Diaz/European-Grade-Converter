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
        if (!selectedCountry || !selectedCountry.grades || !grade) return;

        const matchedGrades = selectedCountry.grades.filter(grading => grading.index === grade.index);
        if (matchedGrades.length === 0) return;

        let result: string | null = null;
        const gradeToCompare = matchedGrades[0].grade;

        // Case 1: Grade is not a percentage
        if (!grade.grade.match(/[0-9]+%/)) {
            if (gradeToCompare.includes("-")) {
                const [min, max] = gradeToCompare.split("-").map(Number);
                result = ((min + max) / 2).toFixed(2); // Calculate the average
            } else {
                result = gradeToCompare; // Use the grade directly
            }
        }
        // Case 2: Grade is a percentage
        else {
            if (gradeToCompare.includes("-")) {
                const match = grade.grade.match(/[0-9]+/g);
                const [x1, x2] = match.map(Number);
                const [y2, y1] = gradeToCompare.split("-").map(Number);
                // Apply linear interpolation to calculate the equivalent grade
                result = (y1 + ((y2 - y1) / (x2 - x1)) * (y2 - y1)).toFixed(2);
            } else {
                result = gradeToCompare; // Use the grade directly
            }
        }
        setCalculatedGrade(result); // Update the result
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
