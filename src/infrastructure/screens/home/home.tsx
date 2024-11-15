"use client";

import React, { useState, useEffect } from "react";

import { Header } from "./components/header";
import { CountryAdditionalInfo } from "./components/countryAdditionalInfoComponent";
import { HomeScreenMain, CountryAndGradeContainer, ConversorContainer, ContryAditionalInfoContainer } from './home.styles'
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
  // TODO: GIVE A VISUAL FEEDBACK WITH COLORS IN GRADE
  return (
    <HomeScreenMain>
      {isClient && (
        <>
          <Header />
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
          <ContryAditionalInfoContainer>
            <CountryAdditionalInfo />
          </ContryAditionalInfoContainer>
          <Footer />
        </>
      )}
    </HomeScreenMain>
  );
}
