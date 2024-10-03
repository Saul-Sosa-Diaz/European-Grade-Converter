/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description This file contains the context .
 */

import { createContext } from 'react';
import { useState } from 'react';

const ToConvertContext = createContext(null);

const ToConvertContextProvider = ({ children }) => {
    const [gradeToConvert, setGradeToConvert] = useState(undefined);
    const [countryFrom, setCountryFrom] = useState(undefined);
    return (
      <ToConvertContext.Provider value={{ gradeToConvert, setGradeToConvert, countryFrom, setCountryFrom }}>
        {...children}
      </ToConvertContext.Provider>
    );
};
  
export { ToConvertContext, ToConvertContextProvider };
