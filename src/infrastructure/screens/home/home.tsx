"use client";
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

  // TODO: GIVE A VISUAL FEEDBACK WITH COLORS IN GRADE
  return (
    <HomeScreenMain>

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

    </HomeScreenMain>
  );
}
