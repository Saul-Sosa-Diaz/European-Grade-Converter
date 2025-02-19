/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the CountryFromTreeSelect component.
 *
 * @date February 19, 2025
 * @description This file defines the CountryFromTreeSelect component used in the home screen.
 * @author Saul Sosa
 */

import { CountryWithEvaluationInfo, findCountryByKey } from "@/domain/country/country";
import { CustomTreeSelect } from "../customTreeSelect";
import { useState } from "react";
import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { renderOptionTemplate, renderSelectedItemTemplate } from "../treeSelectTemplates";
import { DropdownChangeEvent } from "primereact/dropdown";

export const CountryFromTreeSelect = ({ countries }) => {
    const { setGradeToConvert, setCountryFrom, countryFrom } = useGradeConverterContext();
    const [selectedKeyCountry, setSelectedKeyCountry] = useState<string | null>(null);

    const handleCountryChange = (e: DropdownChangeEvent) => {
        const selectedKeyCountryValue = e.value;
        if (selectedKeyCountryValue) {
            const NEW_COUNTRY = findCountryByKey(selectedKeyCountryValue, countries);
            setGradeToConvert(null); // Reset grade in global context
            setSelectedKeyCountry(selectedKeyCountryValue); // Update selected country key
            setCountryFrom(NEW_COUNTRY); // Update country in global context
        }
    };

    return (
        <CustomTreeSelect<CountryWithEvaluationInfo>
            value={selectedKeyCountry} // The selected country key
            onChange={(e: DropdownChangeEvent) => handleCountryChange(e)} // Event handler for country change
            options={countries}
            nodeTemplate={renderOptionTemplate} // Template for rendering country options
            valueTemplate={renderSelectedItemTemplate} // Template for rendering the selected country
            optionLabel="name" // Label to display for each country
            placeholder="Select a Country" // Placeholder text for the dropdown
            panelFooterTemplate={() =>
                // Template for footer in dropdown panel
                countryFrom ? (
                    <span>
                        <b>{countryFrom.label}</b> selected.
                    </span>
                ) : (
                    "No country selected."
                )
            }
            filter={true} // Enables filtering for the country dropdown
        />
    );
};