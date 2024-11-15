"use client";

import React, { useState, useEffect } from "react";
import "@/src/styles/global-theme.css";

import { Header } from "./components/header";
import { CountryAdditionalInfo } from "./components/countryAdditionalInfoComponent";
import { Footer } from "./components/footer";
import { CalculatedGradeComponent } from "./components/CalculatedGradeComponent/CalculatedGradeComponent";
import { CountryToTreeSelect } from "./components/CountryToTreeSelectComponent.tsx/CountryToTreeSelectComponent";
import { InputGrade } from "./components/InputGradeComponent/InputGradeComponent";
import { CountryFromTreeSelect } from "./components/CountryFromTreeSelectorComponent/CountryFromTreeSelectComponent";

export function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main
      className="w-screen h-screen text-font-primary"
      style={{ margin: "0px 00px 0px 0px" }}
    >
      {isClient && (
        <div className="flex flex-column h-full">
          <Header />
          <div className="flex flex-column w-screen sm:gap-3 h-full">
            <div className="flex flex-column md:flex-row align-items-center justify-content-center h- w-screen gap-3 md:mt-8 mt-4">
              <div className="flex flex-column gap-3 w-20rem">
                <CountryFromTreeSelect />
                <InputGrade />
              </div>
              <span className="pi pi-arrow-right hidden md:block" />
              <span className="pi pi-arrow-down block md:hidden" />
              <div className="flex flex-column gap-3 w-20rem">
                <CountryToTreeSelect />
                <CalculatedGradeComponent />
              </div>
            </div>
            <div className="flex justify-content-center">
              <CountryAdditionalInfo />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </main>
  );
}
