// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { useEffect, useState } from "react";
import { useGetCountryList } from "@/hooks/country/useGetCountryList";
import { CountryList } from "./components/CountryList/CountryList";
import { ProgressSpinner } from "primereact/progressspinner";
import { HeaderSideBar, MainContainer, MainContent, SideBar } from "./admin.styles";
import { useEffect, useState } from "react";
import { UniversityList } from "./components/UniversityList/UniversityList";
import { useGetUniversityList } from "@/hooks/university/useGetUniversityList";
import { EvaluationSystemList } from "./components/EvaluationSystemList/EvaluationSystemList";
// TODO: UNCOMMENT THE FOLLOWING LINES

enum AdminTabsNames {
  COUNTRIES = 'Countries',
  UNIVERSITIES = 'Universities',
  EVALUATION_SYSTEM = 'Evaluation Systems'
}

export const Admin = () => {
  // const { data: session, status } = useSession();
  // const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(AdminTabsNames.COUNTRIES);

  // useEffect(() => {
  //   if (status === "loading") {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [status]);

  // if (loading) {
  //   return <ProgressSpinner />
  // }
  // if (status !== "loading" && !session) {
  //   redirect('/403')
  // }

  const { countryList, isLoading: countryListIsLoading, refetch: refetchCountryList } = useGetCountryList();
  const { universityList, isLoading: universityListIsLoading, refetch: refetchUniversityList } = useGetUniversityList();

  useEffect(() => {
    if (activeTab === AdminTabsNames.COUNTRIES || activeTab === AdminTabsNames.UNIVERSITIES) {
      refetchCountryList();
      refetchUniversityList();
    }
  }, [activeTab]);
  // return (
  //   <>
  //     {session && (
  //       <>
  //         <h1>Admin Page</h1>
  //         <p>Welcome, {session.user.name}</p>
  //       </>
  //     )}
  //   </>
  // );
  if (countryListIsLoading || universityListIsLoading) {
    return <ProgressSpinner />
  }
  return (
    <>
      <MainContainer>
        <SideBar>
          <HeaderSideBar><h1>Admin Page</h1 ></HeaderSideBar>
          <ul>
            <li onClick={() => { setActiveTab(AdminTabsNames.COUNTRIES) }}>{AdminTabsNames.COUNTRIES}</li>
            <li onClick={() => { setActiveTab(AdminTabsNames.UNIVERSITIES) }}>{AdminTabsNames.UNIVERSITIES}</li>
            <li onClick={() => { setActiveTab(AdminTabsNames.EVALUATION_SYSTEM) }}>{AdminTabsNames.EVALUATION_SYSTEM}</li>
          </ul>
        </SideBar>
        <MainContent>
          {activeTab === AdminTabsNames.COUNTRIES && <CountryList countryList={countryList} />}
          {activeTab === AdminTabsNames.UNIVERSITIES && <UniversityList universityList={universityList} countryList={countryList} />}
          {activeTab === AdminTabsNames.EVALUATION_SYSTEM && <EvaluationSystemList evaluationSystemList={[]} />}
        </MainContent>

      </MainContainer>
    </>
  );
};

