"use client";
import { Header } from "./components/header";

import { HomeScreenMain, CountryAndGradeContainer, ConversorContainer, ContryAditionalInfoContainer, ArrowRight, ArrowDown } from './home.styles'
import { Footer } from "./components/footer";
import { CalculatedGradeComponent } from "./components/CalculatedGradeComponent/CalculatedGradeComponent";
import { CountryToTreeSelect } from "./components/CountryToTreeSelectComponent.tsx/CountryToTreeSelectComponent";
import { InputGrade } from "./components/InputGradeComponent/InputGradeComponent";
import { CountryFromTreeSelect } from "./components/CountryFromTreeSelectorComponent/CountryFromTreeSelectComponent";
import { CountryAdditionalInfo } from "./components/CountryAdditionalComponent/CountryAdditionalInfoComponent";
import { useGetCountries } from "@/hooks/useGetCountries";
import { GradeConverterContextProvider } from "@/context/GradeConverterContext";
import { ProgressSpinner } from 'primereact/progressspinner';
// TODO: FIX SWITZELAND

export function Home() {
  const { countries, isLoading } = useGetCountries();
  // TODO: GIVE A VISUAL FEEDBACK WITH COLORS IN GRADE
  if (isLoading) {
    return <ProgressSpinner />
  }
  return (
    <GradeConverterContextProvider countries={countries}>
      <HomeScreenMain>
        <Header />
        <ConversorContainer>
          <CountryAndGradeContainer>
            <CountryFromTreeSelect countries={countries} />
            <InputGrade />
          </CountryAndGradeContainer>
          <ArrowRight className="pi pi-arrow-right" />
          <ArrowDown className="pi pi-arrow-down" />
          <CountryAndGradeContainer>
            <CountryToTreeSelect countries={countries} />
            <CalculatedGradeComponent />
          </CountryAndGradeContainer>
        </ConversorContainer>
        <ContryAditionalInfoContainer>
          <CountryAdditionalInfo />
        </ContryAditionalInfoContainer>
        <Footer />

      </HomeScreenMain>
    </GradeConverterContextProvider >
  );
}
