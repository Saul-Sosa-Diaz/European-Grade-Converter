"use client"
import { createApi } from "@/api/createApi";
import { Api } from "@/api/domain/Api";
import React from "react";

export const ApiContext = React.createContext(null);

type ApiProviderProps = {
  children: React.ReactNode;
};

export const ApiProvider = ({
  children,
}: ApiProviderProps) => {
  const api = createApi();

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = (): Api => {
  const context = React.useContext(ApiContext);

  if (context === null) {
    throw new Error("useApi must be used within a ApiProvider");
  }

  return context;
};
