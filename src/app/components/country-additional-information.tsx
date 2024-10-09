"use client";

import React, { useContext } from "react";
import "@/src/app/styles/global-theme.css";
import { ToConvertContext } from "../context/to-convert-context";
import { Card } from 'primereact/card';


const CountryAdditionalInfo: React.FC = () => {
  const { countryFrom } = useContext(ToConvertContext); // Context for sharing grade and country globally
  return (
    <div className="flex align-items-center justify-content-center text-center">
      {countryFrom &&
        (countryFrom.aditionalInfo ||
          countryFrom.url ||
          countryFrom.document_url) && (
          <Card className="text-color-primary md:text-xl m-3 mb-6">
            {/* Conditionally render additional information if available */}
            {countryFrom && countryFrom.aditionalInfo && (
              <p className="px-1">{countryFrom.aditionalInfo}.</p>
            )}
            {countryFrom && countryFrom.url && (
              <p className="px-1">
                You can find more information about the grading system in{" "}
                <a href={countryFrom.url} target="_blank">
                  {countryFrom.label}
                </a>
                .
                <br />
              </p>
            )}
            {countryFrom && countryFrom.url && (
              <p className="px-1">
                If you want to see the specific document of conversions you can
                download it in{" "}
                <a href={countryFrom.document_url} target="_blank">
                  {countryFrom.label} document
                </a>
                .
                <br />
              </p>
            )}
          </Card>
        )}
    </div>
  );
};

export default CountryAdditionalInfo;
