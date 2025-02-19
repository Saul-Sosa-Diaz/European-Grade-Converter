/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the home screen.
 *
 * @date February 19, 2025
 * @description This file defines the home screen used in the application.
 * @author Saul Sosa
 */

'use client';
import { Header } from "./components/header";

import { HomeScreenMain, CountryAndGradeContainer, ConversorContainer, ContryAditionalInfoContainer, ArrowRight, ArrowDown } from './home.styles'
import { Footer } from "./components/footer";
import { CalculatedGradeComponent } from "./components/CalculatedGradeComponent/CalculatedGradeComponent";
import { CountryToTreeSelect } from "./components/CountryToTreeSelectComponent.tsx/CountryToTreeSelectComponent";
import { InputGrade } from "./components/InputGradeComponent/InputGradeComponent";
import { CountryFromTreeSelect } from "./components/CountryFromTreeSelectorComponent/CountryFromTreeSelectComponent";
import { CountryAdditionalInfo } from "./components/CountryAdditionalComponent/CountryAdditionalInfoComponent";
import { useGetCountryWithEvaluationInfoList } from "@/hooks/country/useGetCountryWithEvaluationInfoList";
import { GradeConverterContextProvider } from "@/context/GradeConverterContext";
import { ProgressSpinner } from 'primereact/progressspinner';

export function Home() {
  const { countryWithEvaluationInfoList, isLoading } = useGetCountryWithEvaluationInfoList();
  if (isLoading) {
    return <ProgressSpinner />
  }
  return (
    <GradeConverterContextProvider countries={countryWithEvaluationInfoList || []}>
      <HomeScreenMain>
        <Header />
        <ConversorContainer>
          <CountryAndGradeContainer>
            <CountryFromTreeSelect countries={countryWithEvaluationInfoList || []} />
            <InputGrade />
          </CountryAndGradeContainer>
          <ArrowRight className="pi pi-arrow-right" />
          <ArrowDown className="pi pi-arrow-down" />
          <CountryAndGradeContainer>
            <CountryToTreeSelect countries={countryWithEvaluationInfoList || []} />
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
