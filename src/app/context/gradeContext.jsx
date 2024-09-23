import { createContext } from 'react';
import { useState } from 'react';

const GradeContext = createContext();

const GradeContextProvider = ({ children }) => {
    const [grade, setGrade] = useState(undefined);
    return (
      <GradeContext.Provider value={{grade, setGrade}}>
        {...children}
      </GradeContext.Provider>
    );
};
  
export { GradeContext, GradeContextProvider };
