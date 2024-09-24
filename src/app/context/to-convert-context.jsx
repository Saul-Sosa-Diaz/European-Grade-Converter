import { createContext } from 'react';
import { useState } from 'react';

const ToConvertContext = createContext();

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
