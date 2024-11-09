"use client";

import React, { useState, useEffect } from "react";
import "@/src/styles/global-theme.css";

import { useGetCountries } from "@/src/hooks/useGetCountries";
import { ToConvertContextProvider } from "@/src/context/to-convert-context";
import Header from "./components/header";
import CountryAdditionalInfo from "./components/country-additional-information";
import CountryDropdownAndGradeConversed from "./components/countryTreeSelectionSolution";
import CountryDropdownAndGrade from "./components/countrytreeSelectionAndDropdownGrade";
import Footer from "./components/footer";

export function Home() {
  const [isClient, setIsClient] = useState(false);
  const {countries} = useGetCountries();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main
      className="w-screen h-screen text-font-primary"
      style={{ margin: "0px 00px 0px 0px" }}
    >
      {isClient && (
        <ToConvertContextProvider>
          <div className="flex flex-column h-full">
            <Header />
            <div className="flex flex-column w-screen sm:gap-3 h-full">
              <div className="flex flex-column md:flex-row align-items-center justify-content-center h- w-screen gap-3 md:mt-8 mt-4">
                <CountryDropdownAndGrade />
                <span className="pi pi-arrow-right hidden md:block"></span>
                <span className="pi pi-arrow-down block md:hidden"></span>
                <CountryDropdownAndGradeConversed />
              </div>
              <div className="flex justify-content-center">
                <CountryAdditionalInfo />
              </div>
              {countries && JSON.stringify(countries)}
            </div>
            <Footer />
          </div>
        </ToConvertContextProvider>
      )}
    </main>
  );
}
