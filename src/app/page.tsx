"use client";

import React, { useState, useEffect } from "react";
import "@/src/app/styles/global-theme.css";
import CountryDropdownAndGrade from "./components/countrytreeSelectionAndDropdownGrade";
import CountryDropdownAndGradeConversed from "./components/countryTreeSelectionSolution";
import { ToConvertContextProvider } from "./context/to-convert-context";
import CountryAdditionalInfo from "./components/country-additional-information";
import Header from "./components/header";
import 'primeicons/primeicons.css';
import Footer from "./components/footer";

export default function Home() { 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main
      className="w-screen text-font-primary"
      style={{ margin: "0px 00px 0px 0px" }}
    >
      {isClient && (
        <ToConvertContextProvider>
          <Header />
          <div className="flex flex-column justify-content-center w-screen h-full sm:gap-3">
            <div className="flex flex-row align-items-center justify-content-center w-screen sm:gap-3 mt-8">
              <CountryDropdownAndGrade />
              <span className="pi pi-arrow-right"></span>
              <CountryDropdownAndGradeConversed />
            </div>
            <div className="flex justify-content-center mt-8">
              <CountryAdditionalInfo />
            </div>
          </div>
          <Footer />
        </ToConvertContextProvider>
      )}
    </main>
  );
}
