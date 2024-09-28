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
            Most of the equivalences are taken from this {" "}
            <a href="https://drive.google.com/file/d/1CvwHCC1S7QvrdePkg_gFDmVOQmTrJpBr/view">
              table of equivalences
            </a>
            .
          </p>
        </div>
      </div>
      <footer className="flex justify-content-center bg-indigo-600 absolute bottom-0 block w-screen ">
        <p className="text-white">
          If you find any errors or have any suggestions, please submit an email
          to <strong>Saúl Sosa Díaz (alu0101404141@ull.edu.es)</strong>. This
          project is being supervised by Prof. Juan{" "}
          <strong>José Salazar González (jjsalaza@ull.edu.es)</strong> at
          Universidad de La Laguna.
        </p>
      </footer>
    </main>
  );
}
