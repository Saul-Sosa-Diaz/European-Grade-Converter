import { Country } from "@/domain/countries/country";
import { CustomTreeSelect } from "../customTreeSelect";
import { findCountryByKey } from "@/infrastructure/fixture/countries";
import { useState } from "react";
import { useGradeConverterContext } from "@/context/GradeConverterContext";
import { renderOptionTemplate, renderSelectedItemTemplate } from "../treeSelectTemplates";
import { DropdownChangeEvent } from "primereact/dropdown";

export const CountryFromTreeSelect = ({countries}) => {
    const { setGradeToConvert, setCountryFrom, countryFrom } = useGradeConverterContext();
    const [selectedKeyCountry, setSelectedKeyCountry] = useState<string | null>(null);

    const handleCountryChange = (e: DropdownChangeEvent) => {
        const selectedKeyCountryValue = e.value;
        if (selectedKeyCountryValue) {
            const NEW_COUNTRY = findCountryByKey(selectedKeyCountryValue);
            setGradeToConvert(null); // Reset grade in global context
            setSelectedKeyCountry(selectedKeyCountryValue); // Update selected country key
            setCountryFrom(NEW_COUNTRY); // Update country in global context
        }
    };

    return (
        <CustomTreeSelect<Country>
            value={selectedKeyCountry} // The selected country key
            onChange={(e: DropdownChangeEvent) => handleCountryChange(e)} // Event handler for country change
            options={countries} // TODO: List of available countries from the database
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