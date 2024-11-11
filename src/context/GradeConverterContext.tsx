/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description This file contains the needed context to make the grade conversion.
 */

import { createContext, useContext } from 'react';
import { useState } from 'react';
import { COUNTRIES } from '../infrastructure/fixture/countries';

const GradeConverterContext = createContext(null);

export const GradeConverterContextProvider = ({ children }) => {
  const [gradeToConvert, setGradeToConvert] = useState(undefined);
  const [countryFrom, setCountryFrom] = useState(undefined);
  const [countryTo, setCountryTo] = useState(COUNTRIES.find((country) => country.code === "ES")); // TODO: Change to DB
  return (
    <GradeConverterContext.Provider value={{ gradeToConvert, setGradeToConvert, countryFrom, setCountryFrom, countryTo, setCountryTo }}>
      {children}
    </GradeConverterContext.Provider>
  );
};

export const useGradeConverterContext = () => {
  const context = useContext(GradeConverterContext);
  if (context === undefined) {
    throw new Error('useGradeConverterContext must be used within a GradeConverterContextProvider');
  }
  return context;
}

