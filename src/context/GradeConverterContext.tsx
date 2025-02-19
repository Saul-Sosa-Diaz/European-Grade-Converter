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

import React, { createContext, ReactNode, useContext } from 'react';
import { useState } from 'react';
import { CountryWithEvaluationInfo } from '@/domain/country/country';

const GradeConverterContext = createContext(null);

interface GradeConverterContextProviderProps {
  children: ReactNode;
  countries: CountryWithEvaluationInfo[];
}
interface GradeConverterContextType {
  gradeToConvert: string | undefined;
  setGradeToConvert: React.Dispatch<React.SetStateAction<CountryWithEvaluationInfo | undefined>>;
  countryFrom: CountryWithEvaluationInfo | undefined;
  setCountryFrom: React.Dispatch<React.SetStateAction<CountryWithEvaluationInfo | undefined>>;
  countryTo: CountryWithEvaluationInfo | undefined;
  setCountryTo: React.Dispatch<React.SetStateAction<CountryWithEvaluationInfo | undefined>>;
}

export const GradeConverterContextProvider = ({ children, countries }: GradeConverterContextProviderProps) => {
  const [gradeToConvert, setGradeToConvert] = useState<string>("");
  const [countryFrom, setCountryFrom] = useState<CountryWithEvaluationInfo>(undefined);
  const [countryTo, setCountryTo] = useState<CountryWithEvaluationInfo>(
    countries.find((country) => country.code === "ES") || countries[0]
  );
  return (
    <GradeConverterContext.Provider value={{ gradeToConvert, setGradeToConvert, countryFrom, setCountryFrom, countryTo, setCountryTo }}>
      {children}
    </GradeConverterContext.Provider>
  );
};

/**
 * Custom hook to access the GradeConverterContext.
 * 
 * This hook provides access to the GradeConverterContext, ensuring that it is used within a 
 * GradeConverterContextProvider. If the context is not available, it throws an error.
 * 
 * @returns {GradeConverterContextType} The context value for grade conversion.
 * @throws {Error} If the hook is used outside of a GradeConverterContextProvider.
 */
export const useGradeConverterContext = (): GradeConverterContextType => {
  const context = useContext(GradeConverterContext);
  if (context === undefined) {
    throw new Error('useGradeConverterContext must be used within a GradeConverterContextProvider');
  }
  return context;
}

