import { Country } from "@/src/domain/countries/country";
import { CustomTreeSelect } from "../customTreeSelect";
import { COUNTRIES, findCountryByKey } from "@/src/infrastructure/fixture/countries";
import { useEffect, useState } from "react";
import { useGradeConverterContext } from "@/src/context/GradeConverterContext";
import { renderOptionTemplate, renderSelectedItemTemplate } from "../treeSelectTemplates";

export const CountryToTreeSelect = () => {
    const { setCountryTo, countryTo } = useGradeConverterContext(); // Access the global context to set the destination country

    // State to hold the key of the selected country
    const [keyCountryTo, setKeyCountryTo] = useState<string | null>(
        countryTo.key
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
        <CustomTreeSelect<Country>
            filter={true} // Enable filtering for searching countries
            value={keyCountryTo} // Currently selected country key
            onChange={(e) => {
                updateKeyCountryTo(e);
            }}
            options={COUNTRIES} // TODO: List of available countries of database
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
    );
};