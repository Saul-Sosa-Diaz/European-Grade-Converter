"use client";

import React, { useState, useEffect } from "react";

import { Header } from "./components/header";
import { CountryAdditionalInfo } from "./components/countryAdditionalInfoComponent";
import { HomeScreenMain, CountryAndGradeContainer, ConversorContainer } from './home.styles'
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
      className="w-screen h-screen "
      style={{ margin: "0px 00px 0px 0px" }}
    >
      {isClient && (
        <HomeScreenMain>
          <Header />
          <div className="flex flex-column w-screen sm:gap-3 h-full">
            <ConversorContainer>
              <CountryAndGradeContainer>
                <CountryFromTreeSelect />
                <InputGrade />
              </CountryAndGradeContainer>
              <span className="pi pi-arrow-right hidden md:block" />
              <span className="pi pi-arrow-down block md:hidden" />
              <CountryAndGradeContainer>
                <CountryToTreeSelect />
                <CalculatedGradeComponent />
              </CountryAndGradeContainer>
            </ConversorContainer>
            <div className="flex justify-content-center">
              <CountryAdditionalInfo />
            </div>
          </div>
          <Footer />
        </HomeScreenMain>
      )}
    </main>
  );
}
