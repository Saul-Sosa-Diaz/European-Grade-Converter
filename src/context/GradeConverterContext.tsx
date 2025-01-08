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
import { Country } from '@/domain/countries/country';

const GradeConverterContext = createContext(null);

interface GradeConverterContextProviderProps {
  children: ReactNode;
  countries: Country[];
}
interface GradeConverterContextType {
  gradeToConvert: Country | undefined;
  setGradeToConvert: React.Dispatch<React.SetStateAction<Country | undefined>>;
  countryFrom: Country | undefined;
  setCountryFrom: React.Dispatch<React.SetStateAction<Country | undefined>>;
  countryTo: Country | undefined;
  setCountryTo: React.Dispatch<React.SetStateAction<Country | undefined>>;
}

export const GradeConverterContextProvider = ({ children, countries }: GradeConverterContextProviderProps) => {
  const [gradeToConvert, setGradeToConvert] = useState<Country>(undefined);
  const [countryFrom, setCountryFrom] = useState<Country>(undefined);
  const [countryTo, setCountryTo] = useState<Country>(
    countries.find((country) => country.code === "ES")
  ); 
  return (
    <GradeConverterContext.Provider value={{ gradeToConvert, setGradeToConvert, countryFrom, setCountryFrom, countryTo, setCountryTo }}>
      {children}
    </GradeConverterContext.Provider>
  );
};

export const useGradeConverterContext = (): GradeConverterContextType => {
  const context = useContext(GradeConverterContext);
  if (context === undefined) {
    throw new Error('useGradeConverterContext must be used within a GradeConverterContextProvider');
  }
  return context;
}

