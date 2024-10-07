"use client";



import CountryDropdownAndGrade from "./components/countrytreeSelectionAndDropdownGrade";
import CountryDropdownAndGradeConversed from "./components/countryTreeSelectionSolution";
import { ToConvertContextProvider } from "./context/to-convert-context";
import CountryAdditionalInfo from "./components/country-additional-information";

export default function Home() {
  return (
      <main className="w-screen" style={{ margin: "0px 00px 0px 0px" }}>
        <ToConvertContextProvider>
        <div className="flex justify-content-center flex-wrap w-screen gap-7">
          <div className="flex justify-content-center bg-indigo-600 block w-screen">
            <h1 className="text-white">University Grade Conversion</h1>
          </div>
          <div className="flex gap-3 justify-content-center">
              <CountryDropdownAndGrade />
              <img
                className="w-1"
                src="https://openclipart.org/image/2400px/svg_to_png/200343/primary-line-line-arrow-end.png"
              ></img>
              <CountryDropdownAndGradeConversed />
          </div>
          <CountryAdditionalInfo/>

        </div>

        
        <footer className="flex justify-content-center bg-indigo-600 absolute bottom-0 block w-screen ">
          <p className="text-white">
            If you find an error or have a suggestion, please inform 
            <strong> Saúl Sosa Díaz (<a href="mailto:alu0101404141@ull.edu.es">alu0101404141@ull.edu.es</a>)</strong>. This
            project is being supervised by <strong>Prof. Juan
            José Salazar González (<a href="mailto:jjsalaza@ull.edu.es">jjsalaza@ull.edu.es</a>)</strong> at
            Universidad de La Laguna.
          </p>
        </footer>
         </ToConvertContextProvider>
      </main>
   
  );
}
