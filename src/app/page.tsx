"use client";

import CountryDropdownAndGrade from "./components/countryDropdownAndGrade";
import CountryDropdownAndGradeConversed from "./components/countryDropboxSolution";
import { ToConvertContextProvider } from "./context/to-convert-context";

export default function Home() {
  return (
    <main>
      <h1>Grade conversion</h1>
      <div className="flex gap-3">
        <ToConvertContextProvider>
          <CountryDropdownAndGrade />
          <img
            className="w-1"
            src="https://openclipart.org/image/2400px/svg_to_png/200343/primary-line-line-arrow-end.png"
          ></img>
          <CountryDropdownAndGradeConversed />
        </ToConvertContextProvider>
      </div>
    </main>
  );
}
