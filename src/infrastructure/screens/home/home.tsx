"use client";

import React, { useState, useEffect } from "react";

import { Header } from "./components/header";

import { HomeScreenMain, CountryAndGradeContainer, ConversorContainer, ContryAditionalInfoContainer, ArrowRight, ArrowDown } from './home.styles'
import { Footer } from "./components/footer";
import { CalculatedGradeComponent } from "./components/CalculatedGradeComponent/CalculatedGradeComponent";
import { CountryToTreeSelect } from "./components/CountryToTreeSelectComponent.tsx/CountryToTreeSelectComponent";
import { InputGrade } from "./components/InputGradeComponent/InputGradeComponent";
import { CountryFromTreeSelect } from "./components/CountryFromTreeSelectorComponent/CountryFromTreeSelectComponent";
import { CountryAdditionalInfo } from "./components/CountryAdditionalComponent/CountryAdditionalInfoComponent";
// TODO: FIX SWITZELAND

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
            <ArrowRight className="pi pi-arrow-right" />
            <ArrowDown className="pi pi-arrow-down" />
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
