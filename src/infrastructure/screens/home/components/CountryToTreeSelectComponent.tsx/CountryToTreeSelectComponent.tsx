/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the CountryToTreeSelect component.
 *
 * @date February 19, 2025
 * @description This file defines the CountryToTreeSelect component used in the home screen.
 * @author Saul Sosa
 */

import { CountryWithEvaluationInfo, findCountryByKey } from "@/domain/country/country";
import { CustomTreeSelect } from "../customTreeSelect";
import { useEffect, useState } from "react";
import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { renderOptionTemplate, renderSelectedItemTemplate } from "../treeSelectTemplates";

export const CountryToTreeSelect = ({ countries }: { countries: CountryWithEvaluationInfo[] }) => {
    const { setCountryTo, countryTo } = useGradeConverterContext(); // Access the global context to set the destination country

    // State to hold the key of the selected country
    const [keyCountryTo, setKeyCountryTo] = useState<string | null>(
        countryTo ? countryTo.key : null
    );

    // Update the actual country object whenever the keyCountryTo state changes
    useEffect(() => {
        const NEW_COUNTRY = findCountryByKey(keyCountryTo, countries); // Find the country by its key
        setCountryTo(NEW_COUNTRY); // Update the destination country in the global context
    }, [keyCountryTo]);

    const updateKeyCountryTo = (e) => {
        if (e.value) {
            setKeyCountryTo(e.value);
        }
    };

    return (
        <CustomTreeSelect<CountryWithEvaluationInfo>
            filter={true} // Enable filtering for searching countries
            value={keyCountryTo} // Currently selected country key
            onChange={(e) => {
                updateKeyCountryTo(e);
            }}
            options={countries}
            nodeTemplate={renderOptionTemplate} // Template to render each country option
            valueTemplate={renderSelectedItemTemplate} // Template to render the selected country
            optionLabel="label" // Display the country label as the display name
            placeholder="Select a Country" // Placeholder text for the TreeSelect dropdown
            panelFooterTemplate={() =>
                keyCountryTo && countryTo ? ( // Footer template displaying the selected country
                    <span>
                        <b>{countryTo.label}</b> selected.
                    </span>
                ) : (
                    "No country selected."
                )
            }
        />
    );
};