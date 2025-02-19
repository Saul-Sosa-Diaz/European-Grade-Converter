/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the ApiContext component.
 * It provides the API context and hooks for accessing the API.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the ApiContext component.
 * @author Saul Sosa
 */

'use client'
import { createApi } from "@/api/createApi";
import { Api } from "@/api/domain/Api";
import React from "react";

export const ApiContext = React.createContext(null);

type ApiProviderProps = {
  children: React.ReactNode
  offline?: boolean
}


export const ApiProvider = ({
  children,
  offline = false,
}: ApiProviderProps) => {
  const api = createApi({ offline });

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = (): Api => {
  const context = React.useContext(ApiContext);

  if (context === null) {
    throw new Error("useApi must be used within a ApiProvider");
  }

  return context;
};
