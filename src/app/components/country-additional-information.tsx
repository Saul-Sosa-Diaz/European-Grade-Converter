"use client";

import React, { useContext } from "react";
import "@/src/app/styles/global-theme.css";
import { ToConvertContext } from "../context/to-convert-context";
import { Card } from 'primereact/card';


const CountryAdditionalInfo: React.FC = () => {
  const { countryFrom } = useContext(ToConvertContext); // Context for sharing grade and country globally
  return (
    <div> 
         {countryFrom && (countryFrom.aditionalInfo || countryFrom.url || countryFrom.document_url) && <Card>
            {/* Conditionally render additional information if available */}
            {countryFrom && countryFrom.aditionalInfo && (
                <div>{countryFrom.aditionalInfo}</div>
            )}
            {countryFrom && countryFrom.url && (
                <div>
                You can find more information about the grading system in{" "}
                <a href={countryFrom.url}>{countryFrom.label}</a>
                </div>
            )}
            {countryFrom && countryFrom.url && (
                <div>
                If you want to see the specific document of conversions you can
                download it in{" "}
                <a href={countryFrom.document_url}>{countryFrom.label} document</a>
                </div>
            )}
        </Card>}
    </div>
  );
};

export default CountryAdditionalInfo;
