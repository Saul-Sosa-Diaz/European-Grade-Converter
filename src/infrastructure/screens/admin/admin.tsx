/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the Admin screen.
 *
 * @date February 19, 2025
 * @description This file defines the Admin screen component.
 * @author Saul Sosa
 */

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from "react";
import { useGetCountryList } from "@/hooks/country/useGetCountryList";
import { CountryList } from "./components/CountryList/CountryList";
import { HeaderSideBar, MainContainer, MainContent, SideBar } from "./admin.styles";
import { UniversityList } from "./components/UniversityList/UniversityList";
import { useGetUniversityList } from "@/hooks/university/useGetUniversityList";
import { EvaluationSystemList } from "./components/EvaluationSystemList/EvaluationSystemList";
import { useGetEvaluationSystemList } from "@/hooks/evaluationSystem/useGetEvaluationSystemList";
import { Dashboard } from "./components/dashboard/dashboard";

export enum AdminTabsNames {
  DASHBOARD = 'Dashboard',
  COUNTRIES = 'Countries',
  UNIVERSITIES = 'Universities',
  EVALUATION_SYSTEM = 'Evaluation Systems'
}

export const Admin = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(AdminTabsNames.DASHBOARD);

  const { countryList, isLoading: countryListIsLoading, refetch: refetchCountryList } = useGetCountryList();
  const { universityList, isLoading: universityListIsLoading, refetch: refetchUniversityList } = useGetUniversityList();
  const { evaluationSystemList, isLoading: evaluationSystemListIsLoading, refetch: refetchEvaluationSystemList } = useGetEvaluationSystemList();
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (activeTab === AdminTabsNames.COUNTRIES || activeTab === AdminTabsNames.UNIVERSITIES || activeTab === AdminTabsNames.EVALUATION_SYSTEM) {
      refetchCountryList();
      refetchUniversityList();
      refetchEvaluationSystemList();
    }
  }, [activeTab, refetchCountryList, refetchUniversityList, refetchEvaluationSystemList]);
  if (loading) {
    return <ProgressSpinner />
  }

  if (status !== "loading" && !session) {
    redirect('/403')
    return null
  }

  if (countryListIsLoading || universityListIsLoading || evaluationSystemListIsLoading) {
    return <ProgressSpinner />
  }

  return (
    <>
      <MainContainer>
        <SideBar>
          <HeaderSideBar><h1>Admin Page</h1 ></HeaderSideBar>
          <ul>
            {Object.values(AdminTabsNames).map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "active" : ""}
              >
                {tab}
              </li>
            ))}
          </ul>
        </SideBar>
        <MainContent>
          {activeTab === AdminTabsNames.DASHBOARD && <Dashboard userName={session.user.name} role={session.role} />}
          {activeTab === AdminTabsNames.COUNTRIES && <CountryList countryList={countryList} />}
          {activeTab === AdminTabsNames.UNIVERSITIES && <UniversityList universityList={universityList} countryList={countryList} />}
          {activeTab === AdminTabsNames.EVALUATION_SYSTEM && <EvaluationSystemList evaluationSystemList={evaluationSystemList} universityList={universityList} />}
        </MainContent>

      </MainContainer>
    </>
  );
};

