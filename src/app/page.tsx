"use client";

import React, { useState, useEffect } from "react";
import "@/src/app/styles/global-theme.css";
import CountryDropdownAndGrade from "./components/countrytreeSelectionAndDropdownGrade";
import CountryDropdownAndGradeConversed from "./components/countryTreeSelectionSolution";
import { ToConvertContextProvider } from "./context/to-convert-context";
import CountryAdditionalInfo from "./components/country-additional-information";
import Header from "./components/header";
import "primeicons/primeicons.css";
import Footer from "./components/footer";


export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function runer() {
      await fetch("/api/connectdb").then((res) => res.json()).then((data) => { setData(data); });
    }
    setIsClient(true);
    runer();
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
              {data && data.message && (data.message)}
            </div>
            <Footer />
          </div>
        </ToConvertContextProvider>
      )}
    </main>
  );
}

