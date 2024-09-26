"use client";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

import CountryDropdownAndGrade from "./components/countryDropdownAndGrade";
import CountryDropdownAndGradeConversed from "./components/countryDropboxSolution";
import { ToConvertContextProvider } from "./context/to-convert-context";

export default function Home() {
  
  return (
    <main className="w-screen" style={{ margin: "0px 00px 0px 0px" }}>
      <div className="flex justify-content-center flex-wrap w-screen gap-7">
        <div className="flex justify-content-center bg-indigo-600 block w-screen">
          <h1 className="text-white">University Grade Conversion</h1>
        </div>
        <div className="flex gap-3 justify-content-center">
          <ToConvertContextProvider>
            <CountryDropdownAndGrade />
            <img
              className="w-1"
              src="https://openclipart.org/image/2400px/svg_to_png/200343/primary-line-line-arrow-end.png"
            ></img>
            <CountryDropdownAndGradeConversed />
          </ToConvertContextProvider>
        </div>

        <div>
          <p className="border-round surface-100">
            ⚠️ Some countries have evaluation conversion systems that have not
            yet been properly tested.
          </p>
        </div>
      </div>
      <footer className="flex justify-content-center bg-indigo-600 absolute bottom-0 block w-screen ">
        <p className="text-white">
          If you find any errors or have any suggestions, please submit an email
          to <strong>alu0101404141@ull.edu.es</strong>
        </p>
      </footer>
    </main>
  );
}
