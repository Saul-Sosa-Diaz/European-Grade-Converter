"use client"

import CountryDropdownAndGrade from "./components/countryDropdownAndGrade"
import CountryDropdownAndGradeConversed from "./components/countryDropboxSolution"
import {GradeContextProvider} from "./context/gradeContext"

export default function Home() {

  return (
    <main>
      <h1>Grade conversion</h1>
      <div className="flex gap-3">
        <GradeContextProvider>
          <CountryDropdownAndGrade />
          <img className="w-1" src="https://cdn.pixabay.com/photo/2012/04/24/11/42/arrow-39526_1280.png"></img>
          <CountryDropdownAndGradeConversed />
        </GradeContextProvider>
      </div>    
    </main>
  )
}