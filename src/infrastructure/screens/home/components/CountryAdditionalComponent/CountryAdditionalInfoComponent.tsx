/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the CountryAdditionalInfo component.
 *
 * @date February 19, 2025
 * @description This file defines the CountryAdditionalInfo component used in the home screen.
 * @version 1.0.0
 * @author Saul Sosa
 */
'use client';

import "@/styles/global-theme.css";

import { Card } from "primereact/card";
import { useGradeConverterContext } from "@/context/GradeConverterContext";

export const CountryAdditionalInfo = () => {
  const { countryFrom } = useGradeConverterContext(); // Context for sharing grade and country globally
  return (
    <div className="flex align-items-center justify-content-center text-center ">
      {countryFrom &&
        (countryFrom.evaluationSystemInfo ||
          countryFrom.urlToEvidence ||
          countryFrom.document_url) && (
          <Card className="text-color-primary md:text-xl m-0 mt-5 mb-6 w-full">
            {countryFrom && countryFrom.evaluationSystemInfo && (
              <p className="px-1">{countryFrom.evaluationSystemInfo}</p>
            )}
            {countryFrom && countryFrom.urlToEvidence && (
              <p className="px-1">
                If you want to see the specific document of conversions you can
                download it in{" "}
                <a href={countryFrom.urlToEvidence} target="_blank">
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

